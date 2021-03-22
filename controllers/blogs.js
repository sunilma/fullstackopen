const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    const result = await Blog.find({})

      res.json(result)
  })
  
  blogsRouter.post('/', async (req, res) => {
    const blog = new Blog(req.body)
    if (!blog.title || !blog.url) {
      return res.status(400).send('Bad Request')
    }
    if (!blog.likes) {
      blog.likes = 0
    }
  
    const result = await blog.save()
      res.status(201).json(result)
  })

  blogsRouter.delete('/:id', async (req, res) => {
    const result = await Blog.findByIdAndRemove(req.params.id)

      res.status(200).send('item deleted')
  })

  blogsRouter.put('/:id', async (req, res) => {
    const result = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true})

      res.json(result)
  })

module.exports = blogsRouter