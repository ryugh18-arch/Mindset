import React, { useState } from 'react';
function NewBlog({ token }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  function handlePost(e) {
    e.preventDefault();
    fetch('http://localhost:5000/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
      body: JSON.stringify({ title, content, tags: tags.split(',').map(t => t.trim()) })
    }).then(() => alert("Blog posted!"));
  }
  return (
    <form onSubmit={handlePost}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
      <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma separated)" />
      <button type="submit">Post Blog</button>
    </form>
  );
}
export default NewBlog;
