const CommentList = ({ comments, onDelete }) => (
  <div className='mt-8'>
    <h2 className='text-xl font-bold mb-4'>Comments</h2>
    {comments.map((comment) => (
      <div
        key={comment._id}
        className='mb-4 max-w-2xl mx-auto p-4 border rounded justify-between flex items-center'
      >
        <p className='inline'>{comment.content}</p>
        <button
          onClick={() => onDelete(comment._id)}
          className='bg-red-500 text-white px-2 py-1 rounded mt-2'
        >
          Delete
        </button>
      </div>
    ))}
  </div>
)

export default CommentList
