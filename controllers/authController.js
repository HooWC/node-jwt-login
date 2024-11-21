const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// 用户注册逻辑
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error creating user.', error: err });
            }
            res.status(201).json({ message: 'User registered successfully.' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error.', error: err });
    }
};

// 用户登录逻辑
const loginUser = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
        res.json({ message: 'Login successful!', token });
    });
};

// 获取用户数据的逻辑
const getUserData = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];  // 获取 Bearer token

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        const userId = decoded.id;  // 获取从 token 中解码的用户 ID

        db.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
            if (error || results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            const user = results[0];
            res.json({
                id: user.id,
                username: user.username,
                email: user.email,
            });
        });
    });
};

module.exports = { registerUser, loginUser, getUserData };
