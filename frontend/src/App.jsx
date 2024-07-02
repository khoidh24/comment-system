import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create-post' element={<CreatePost />} />
      <Route path='/posts/:id' element={<PostDetail />} />
    </Routes>
  </>
)

export default App
