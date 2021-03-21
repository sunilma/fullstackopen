const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')


const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  

test ('unique identifier is named id', async () => {
  const blogs = await api
    .get('/api/blogs')
  
  console.log(blogs)
    expect(blogs.body[0].id).toBeDefined()
})

test('Post to /api/blogs creates new blog post', async () => {
  const blogs = (await api.get('/api/blogs')).body.length
  const blog = {
    "title": "newwer blog",
    "author": "vlad drtac",
    "url": "www.sun.com",
    "likes": "12"
  }

  const send = await api.post('/api/blogs').send(blog)
  const newBlogs = (await api.get('/api/blogs')).body.length
  expect(newBlogs).toBeGreaterThan(blogs)
})

test ('missing likes from request will default to 0', async () => {
  const blog = {
    "title": "newwer blog",
    "author": "vlad drtac",
    "url": "www.sun.com"
  }
  const result = await api.post('/api/blogs').send(blog)
  console.log(result.body)
  expect(result.body.likes).toBe(0)
})

test('missing title or url from request data response with 400', async () => {
  const blog = {
    "author": "vlad drtac",
    "url": "www.sun.com"
  }
  const result = await api.post('/api/blogs').send(blog)
  expect(result.statusCode).toBe(400)
  expect(result.text).toBe('Bad Request')
            
})

test('delete a blog using ID', async () => {
  const id = "6057981b1e824c44527406f4"

  const result = await api.delete(`/api/blogs/${id}`)
  expect(result.statusCode).toBe(200)
})

test('update a blog using ID', async () => {
  const id = "6057a84b2fd4364e34dafb31"
  const blog = {
    "likes": "30"
  }

  const result = await api.put(`/api/blogs/${id}`).send(blog)
  expect(result.body.likes).toBe(30)
})

  afterAll(async () => {
    await mongoose.connection.close()
  })