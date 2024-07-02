import { useState } from 'react'

const CommentForm = ({ onSubmit, initialData = {} }) => {
  const [content, setContent] = useState(initialData.content || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ content })
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-lg mx-auto mt-4'>
      <div className='mb-4'>
        <label className='block text-gray-700'>Comment</label>
        <textarea
          className='w-full px-3 py-2 border rounded'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded'
      >
        Submit
      </button>
    </form>
  )
}

export default CommentForm
