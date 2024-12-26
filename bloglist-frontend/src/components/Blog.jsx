import PropTypes from 'prop-types'

import { useState } from 'react'
import loginService from '../services/login'

const Blog = ({ blog, addLike, removeBlog }) => {
  const [showDetail, setShowDetail] = useState(false)

  const currentUser = loginService.getCurrentUser()

  const handleLikeClick = event => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, createdBy: blog.createdBy._id }
    addLike(updatedBlog)
  }

  const handleRemoveClick = event => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog)
    }
  }

  return (
    <div className="p-2 border border-solid border-indigo-600">
      <div>
        {blog.title} - {blog.author}
        {showDetail === true ? (
          <>
            <button className="hide-details-btn ml-3 py-2 px-3 text-sm rounded bg-purple-300 text-white" onClick={() => setShowDetail(false)}>hide</button>
            <div>
              {blog.url}<br />
              likes <span data-testid="likes">{blog.likes}</span> <button className="like-btn ml-3 py-2 px-3 text-sm rounded bg-purple-300 text-white" onClick={handleLikeClick}>like</button><br />
              {blog.createdBy?.name}
              username : {currentUser.username} created by : {blog.createdBy?.username}
              {currentUser?.username === blog.createdBy?.username &&
            <div><button className="py-2 px-3 text-sm rounded bg-purple-300 text-white" onClick={handleRemoveClick}>remove</button></div>
              }
            </div>
          </>
        ) :
          <button className="show-details-btn ml-3 py-2 px-3 text-sm rounded bg-purple-300 text-white" onClick={() => setShowDetail(true)}>show</button>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog