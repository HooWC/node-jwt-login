### 目录

```
user-auth-system/
├── backend/              # Node.js 后端
│   ├── Controllers/           # 逻辑
│   │   ├── authController.js       
│   ├── app.js            # 主应用文件
│   ├── routes/           # 路由
│   │   ├── auth.js       # 用户认证路由
│   ├── config/           # 数据库模型
│   │   ├── db.js         # 数据库连接
├── frontend/             # Next.js 前端
│   ├── Components/            
│   │   ├── Login.js
│   │   ├── Logout.js
│   │   ├── Register.js
│   ├── pages/            
│   │   ├── index.js      # 首页
│   │   ├── Dashboard.js  # 用户主页
├── .env                  # 环境变量
├── package.json          # 项目依赖
```

### 创建数据库

```
CREATE DATABASE user_auth_system;

USE user_auth_system;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### NodeJS

```
npm init -y
npm install express cors body-parser bcrypt jsonwebtoken mysql2 dotenv
```

### NextJS

```
cd ../frontend
npm install next react react-dom axios
```

