import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import PostForm from '../components/PostForm'
import { useNavigate } from 'react-router-dom'

const createPost = async (newPost) => {
  const { data } = await axios.post('http://localhost:8080/posts', newPost) // Ensure the correct port and path
  return data
}

const CreatePost = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
      navigate('/')
    }
  })

  return (
    <div className=''>
      <PostForm onSubmit={(data) => mutation.mutate(data)} />
    </div>
  )
}

export default CreatePost
