import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <div className="p-2 border border-solid border-indigo-600">
      <div>
        {blog.title} - {blog.author}
      {showDetail === true ? (
        <>
        <button className="ml-3 py-2 px-3 text-sm rounded bg-purple-300 text-white" onClick={() => setShowDetail(false)}>hide</button>
        <div>{blog.url}<br />likes {blog.likes}<br />{blog.createdBy?.name}</div>
        </>
      ) : 
      <button className="ml-3 py-2 px-3 text-sm rounded bg-purple-300 text-white" onClick={() => setShowDetail(true)}>show</button>
      }
      </div>
    </div> 
  ) 
}

export default Blog