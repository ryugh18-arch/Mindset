import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import BlogFeed from './BlogFeed';
import NewBlog from './NewBlog';
import Profile from './Profile';

function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [page, setPage] = useState('login');

  return (
    <div>
      <h1>MindNest</h1>
      {!token ? (
        page === 'login'
        ? <><Login setToken={setToken} setUsername={setUsername} /><button onClick={() => setPage('signup')}>Signup</button></>
        : <><Signup /><button onClick={() => setPage('login')}>Login</button></>
      ) : (
        <div>
          <span>Welcome, {username}</span>
          <button onClick={() => { setToken(null); setPage('login'); }}>Logout</button>
          <button onClick={() => setPage('feed')}>Blog Feed</button>
          <button onClick={() => setPage('newblog')}>Post Blog</button>
          <button onClick={() => setPage('profile')}>Profile</button>
          {page === 'feed' && <BlogFeed />}
          {page === 'newblog' && <NewBlog token={token} />}
          {page === 'profile' && <Profile token={token} />}
        </div>
      )}
    </div>
  );
}

export default App;
