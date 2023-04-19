import express from 'express';
const app = express();
app.use(express.json());

const PORT = 4000;

app.get('/ping', (_req, res) => {
  console.log('Ping!');
  res.send('Pong!');
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
