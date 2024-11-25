require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.TEST_MONGODB_URI

/*const url =
`mongodb+srv://vanessajoycesutter:${password}@fullstackopen.bq2lb.mongodb.net/noteApp?retryWrites=true&w=majority`
*/
mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)


// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   //mongoose.connection.close()
// })


const note = new Note({
  content: 'JS is not so easy',
  important: true,
})

note.save().then(() => {
  console.log('note saved!')
  mongoose.connection.close()
})
