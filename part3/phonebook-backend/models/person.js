const url = process.env.MONGO_URI;
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(url);

console.log('connecting to MongoDB');

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 200,
    required: [true, 'Name required.'],
  },
  number: {
    type: String,
    minLength: 7,
    maxLength: 50,
    validate: {
      validator: (phone) => {
        /^(?:\d{2,3}-)?\d{6,}$/.test(phone);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'Phone number required.'],
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
