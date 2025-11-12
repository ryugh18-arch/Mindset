import React, { useEffect, useState } from 'react';
function Profile({ token }) {
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/profile', {
      headers: { 'Authorization': token }
    })
      .then(res => res.json())
      .then(data => { setUser(data.user); setBlogs(data.blogs); });
  }, [token]);
  return (
    <div>
      <h2>Profile</h2>
      <div><b>Name:</b> {user.username}</div>
      <div><b>Email:</b> {user.email}</div>
      <h3>Your Blogs</h3>
      {blogs.map(blog => <div key={blog._id}>{blog.title}</div>)}
    </div>
  );
}
export default Profile;
