import React, { useEffect, useState } from 'react';

function BlogFeed() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/blogs')
      .then(res => res.json())
      .then(setBlogs);
  }, []);
  return (
    <div>
      <h2>Blog Feed</h2>
      {blogs.map(blog => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <small>By {blog.author} | {new Date(blog.date).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
export default BlogFeed;
