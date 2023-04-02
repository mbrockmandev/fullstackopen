const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'Invalid username/password.' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 3 * 60 * 60,
  });

  res.status(200).send({ token, username: user.username, name: user.name });
});

const checkToken = (req, res, next) => {
  const auth = req.get('authorization');

  if (!auth || !auth.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Invalid/Missing token.' });
  }

  const token = auth.substring(7);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  req.token = token;
  req.user = decodedToken;
  next();
};

loginRouter.get('/checkToken', checkToken, async (req, res) => {
  res.status(200).json({ error: false });
});

loginRouter.get('/getCredentials', async (req, res) => {
  const auth = req.get('authorization');

  if (!auth || !auth.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Invalid/Missing Token.' });
  }
  const token = auth.substring(7);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  req.token = token;
  req.user = decodedToken;
  res.status(200).json({ user: req.user, token: req.token });
});

module.exports = loginRouter;
