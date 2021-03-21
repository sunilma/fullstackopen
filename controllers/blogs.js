const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
    Blog
      .find({})
      .then(blogs => {
        res.json(blogs)
      })
  })
  
  blogsRouter.post('/', (req, res) => {
    const blog = new Blog(req.body)
    if (!blog.title || !blog.url) {
      return res.status(400).send('Bad Request')
    }
    if (!blog.likes) {
      blog.likes = 0
    }
  
    blog
      .save()
      .then(result => {
        res.status(201).json(result)
      })
  })

  blogsRouter.delete('/:id', (req, res) => {
    Blog
      .findByIdAndRemove(req.params.id)
      .then(blogs => {
        res.status(200).send('item deleted')
      })
  })

  blogsRouter.put('/:id', (req, res) => {
    Blog
      .findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(blogs => {
        res.json(blogs)
      })
  })

module.exports = blogsRouter