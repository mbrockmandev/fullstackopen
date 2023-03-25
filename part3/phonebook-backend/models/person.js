const url = process.env.MONGO_URI;
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(url);

console.log('connecting to:', url);

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
  },
});

module.exports = mongoose.model('Person', personSchema);
