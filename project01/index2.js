// 引入依赖
const express = require('express');
const mongoose = require('mongoose');
const { use } = require('react');

// 创建 Express 应用
const app = express();

// 中间件：解析 JSON
app.use(express.json());

// MongoDB 连接
mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
  // 这两个在 Mongoose 6+ 已默认，可留可去
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB 连接成功'))
.catch(err => console.error('❌ MongoDB 连接失败:', err));

// 定义 Schema（注意类型要用大写 String）
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  gender:    { type: String, enum: ['male', 'female', 'other'], default: 'other' },
  jobTitle:  { type: String, trim: true },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

// 首页
app.get('/', (req, res) => {
  res.send('Hello Node.js + Express + MongoDB 🚀');
});

// 创建用户
app.post('/users', async (req, res) => {
  try {
    // 从请求体中拿数据（字段名自己约定，这里用 camelCase）
    const { firstName, lastName, email, gender, jobTitle } = req.body;

    const user = await User.create({ firstName, lastName, email, gender, jobTitle });

    // 返回创建好的用户
    return res.status(201).json(user);
  } catch (err) {
    // 处理重复 email 的报错
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    return res.status(400).json({ error: err.message });
  }
});

// 获取全部用户（HTML 版本）
app.get('/users', async (req, res) => {
  const users = await User.find();
  const html = `
    <ul>
      ${users.map(u => `<li>${u.firstName} - ${u.email}</li>`).join('')}
    </ul>
  `;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});


app.route("/users/:id")
.get(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ error: "user not found" })
    } else {
        return res.json(user)
    }
})
.patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" })
    return res.json({ status: "Pending" })
})
.delete( async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "Success" })
})

// 也提供 JSON 版本，调试更方便
app.get('/users.json', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ 服务器已启动：http://localhost:${PORT}`);
});
