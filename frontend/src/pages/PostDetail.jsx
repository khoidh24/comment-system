import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'

const fetchPost = async (id) => {
  const { data } = await axios.get(`http://localhost:8080/posts/${id}`)
  return data
}

const fetchComments = async (postId) => {
  const { data } = await axios.get(
    `http://localhost:8080/posts/${postId}/comments`
  )
  return data
}

const updatePost = async ({ id, updatedPost }) => {
  const { data } = await axios.put(
    `http://localhost:8080/posts/${id}`,
    updatedPost
  )
  return data
}

const createComment = async ({ postId, newComment }) => {
  const { data } = await axios.post(
    `http://localhost:8080/posts/${postId}/comments`,
    newComment
  )
  return data
}

const deleteComment = async ({ postId, commentId }) => {
  await axios.delete(
    `http://localhost:8080/posts/${postId}/comments/${commentId}`
  )
}

const deletePost = async (id) => {
  await axios.delete(`http://localhost:8080/posts/${id}`)
}

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [openEditForm, setOpenEditForm] = useState(false)

  const {
    data: post,
    error: postError,
    isLoading: postLoading
  } = useQuery({ queryKey: ['post', id], queryFn: () => fetchPost(id) })
  const {
    data: comments,
    error: commentsError,
    isLoading: commentsLoading
  } = useQuery({ queryKey: ['comments', id], queryFn: () => fetchComments(id) })

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['post', id])
    }
  })

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
      navigate('/')
    }
  })

  const commentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', id])
    }
  })

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', id])
    }
  })

  const handleEditForm = () => {
    setOpenEditForm(!openEditForm)
  }

  if (postLoading || commentsLoading) return <div>Loading...</div>
  if (postError || commentsError)
    return <div>Error: {postError.message || commentsError.message}</div>

  return (
    <div className='container mx-auto mt-8'>
      <Link to='/' className='text-blue-500'>
        Back to Posts
      </Link>
      <div className='justify-between flex items-center max-w-lg mx-auto'>
        <p className='mb-4 mt-8 font-bold text-3xl inline'>{post.content}</p>
        <p onClick={handleEditForm} className=' mb-4 mt-8 cursor-pointer'>
          Edit this Post
        </p>
      </div>

      {openEditForm ? (
        <>
          <h2 className='text-xl font-bold mt-8 mb-4'>Edit Post</h2>
          <PostForm
            initialData={post}
            onSubmit={(updatedPost) =>
              updateMutation.mutate({ id, updatedPost })
            }
          />

          <button
            onClick={() => deletePostMutation.mutate(id)}
            className='mt-4 bg-red-500 text-white px-4 py-2 rounded'
          >
            Delete Post
          </button>
        </>
      ) : null}

      <CommentList
        comments={comments}
        onDelete={(commentId) =>
          deleteCommentMutation.mutate({ postId: id, commentId })
        }
      />
      <CommentForm
        onSubmit={(newComment) =>
          commentMutation.mutate({ postId: id, newComment })
        }
      />
    </div>
  )
}

export default PostDetail
