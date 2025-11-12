const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mindnest');

// Schemas
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const blogSchema = new mongoose.Schema({
    author: String,
    title: String,
    content: String,
    tags: [String],
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Blog = mongoose.model('Blog', blogSchema);

// Middleware: Auth
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, 'SECRET_KEY', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Signup
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.json({ msg: 'Signup successful!' });
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ email: user.email, username: user.username }, 'SECRET_KEY');
    res.json({ token, username: user.username });
});

// Get blogs
app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
});

// Add blog
app.post('/api/blogs', authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const blog = new Blog({
        author: req.user.username,
        title,
        content,
        tags
    });
    await blog.save();
    res.json({ msg: 'Blog posted!' });
});

// User profile
app.get('/api/profile', authenticateToken, async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    const blogs = await Blog.find({ author: user.username });
    res.json({ user, blogs });
});

app.listen(5000, () => console.log('MindNest server running at http://localhost:5000'));
