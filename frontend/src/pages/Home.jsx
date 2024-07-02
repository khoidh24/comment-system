import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CreatePost from './CreatePost'

const fetchPosts = async () => {
  const { data } = await axios.get('http://localhost:8080/posts')
  return data
}

const Home = () => {
  const {
    data: posts,
    error,
    isLoading
  } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='container mx-auto mt-8'>
      <CreatePost />
      <hr className='mt-8 max-w-xl mx-auto' />
      <h1 className='mt-8 text-2xl max-w-2xl font-bold mx-auto'>Post</h1>
      <ul className='max-w-lg mx-auto mt-12'>
        {posts.map((post) => (
          <li
            key={post._id}
            className='mb-2 border-[1px] border-gray-400 rounded-md px-5 py-5'
          >
            <Link to={`/posts/${post._id}`}>
              <p className='mb-2'>User</p>
              <p className='text-3xl'>{post.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
