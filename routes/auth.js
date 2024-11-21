const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 用户注册和登录的路由
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// 获取用户信息的路由
router.get('/user', authController.getUserData);

module.exports = router;
