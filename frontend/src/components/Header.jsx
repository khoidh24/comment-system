import { Link } from 'react-router-dom'

const Header = () => (
  <header className='bg-gray-800 text-white p-4'>
    <nav className='container mx-auto'>
      <Link to='/' className='mr-4'>
        Home
      </Link>
      <Link to='/create-post' className='mr-4'>
        Create Post
      </Link>
    </nav>
  </header>
)

export default Header
