const mongoose = require('mongoose')
const person = require('./models/person')
require('dotenv').config()
require("./models/person")


const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 2) {
  console.log("phonebook:")
  Person.find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()  // Close after data is logged
    })
}

else {
  const name = process.argv[3]
  const number = process.argv[4]

  const new_person = new Person({
    name: name,
    number: number
  })

  new_person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)

  })
}




