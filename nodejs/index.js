
const express = require('express');
const app = express();

// GET 请求：主页
app.get('/', (req, res) => {
  res.send('Hello from Home Page');
});

// GET 请求：/about
app.get('/about', (req, res) => {
  res.send(`Hello ${req.query.name || 'Guest'} from About Page`);
});

// POST 请求：/contact
app.post('/contact', (req, res) => {
  res.send('Contact form submitted');
});

// 启动服务器
app.listen(8000, () => {
  console.log('Server running at http://localhost:8000');
});

/*
	•	req 是 请求对象，包含请求头、路径、IP 等信息。
	•	res 是 响应对象，用来给客户端返回数据。
	•	res.end() 表示结束响应并发送内容。

*/

