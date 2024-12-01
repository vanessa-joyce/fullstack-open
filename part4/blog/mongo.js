require('dotenv').config()
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   //mongoose.connection.close()
// })


const blog = new Blog({
  title: 'JS is not so easy',
  author: 'Vanessa Sutter',
  url: 'https://www.sutter.cloud',
  likes: 10
})

blog.save().then(() => {
  console.log('blog saved!')
  mongoose.connection.close()
})
