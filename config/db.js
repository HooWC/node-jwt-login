const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // 替换为你的数据库用户名
    password: '',        // 替换为你的数据库密码
    database: 'user_auth_system'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database.');
    }
});

module.exports = db;
