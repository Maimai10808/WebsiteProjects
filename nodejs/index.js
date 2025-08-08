
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Home Page'));
app.get('/signup', (req, res) => res.send('Signup Form'));
app.post('/signup', (req, res) => res.send('Signup Success'));

app.listen(8000, () => console.log('Server started'));

/*
	•	req 是 请求对象，包含请求头、路径、IP 等信息。
	•	res 是 响应对象，用来给客户端返回数据。
	•	res.end() 表示结束响应并发送内容。

*/

