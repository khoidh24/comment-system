const express = require('express')
const router = express.Router()
const Post = require('../models/Post.model')
const Comment = require('../models/Comment.model')

// Create a new post
router.post('/', async (req, res) => {
  try {
    const newPost = new Post(req.body)
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Read all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('comments')
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Read a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('comments')
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Update a post by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(200).json(updatedPost)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Delete a post by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id)
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(200).json({ message: 'Post deleted' })
  } catch (err) {
    res.status(500).json(err)
  }
})

// Create a comment for a post
router.post('/:id/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    const newComment = new Comment({ ...req.body, postId: req.params.id })
    const savedComment = await newComment.save()
    post.comments.push(savedComment._id)
    await post.save()
    res.status(201).json(savedComment)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Read all comments for a post
router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id })
    res.status(200).json(comments)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Update a comment by ID
router.put('/:postId/comments/:commentId', async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    )
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' })
    }
    res.status(200).json(updatedComment)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Delete a comment by ID
router.delete('/:postId/comments/:commentId', async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId)
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' })
    }
    await Post.findByIdAndUpdate(req.params.postId, {
      $pull: { comments: req.params.commentId }
    })
    res.status(200).json({ message: 'Comment deleted' })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
