const mongoose = require('mongoose');
const argLength = process.argv.length;
require('dotenv').config();

if (argLength < 3) {
  console.log('give password as an argument');
  process.exit(1);
}

const password = process.argv[2];
const url = process.env.MONGO_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (argLength === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}

if (argLength === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log('person saved');
    mongoose.connection.close();
  });
}

// const person = new Person({
//   name: 'Arto Hellaski',
//   number: '678-3247',
// });
