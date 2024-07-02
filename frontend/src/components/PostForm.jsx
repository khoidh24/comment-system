import { useState } from 'react'

const PostForm = ({ onSubmit, initialData = {} }) => {
  const [content, setContent] = useState(initialData.content || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ content })
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-lg mx-auto mt-8'>
      <div className='mb-4'>
        <label className='block text-gray-700'>
          What are you thinking right now?
        </label>
        <textarea
          className='w-full px-3 py-2 border rounded resize-none'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button
        type='submit'
        className='w-full bg-blue-500 text-white px-4 py-2 rounded'
      >
        Submit
      </button>
    </form>
  )
}

export default PostForm
