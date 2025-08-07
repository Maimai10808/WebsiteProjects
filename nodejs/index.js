const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log('New request received');

  switch (req.url) {
  case '/':
    res.end('Welcome to the Home Page');
    break;
  case '/about':
    res.end('This is the About Page');
    break;
  default:
    res.end('404 Not Found');
}


fs.appendFile('log.txt', `${new Date().toISOString()} - New request received\n`, err => {
  if (err) console.error('日志写入失败:', err);
});

const log = `${new Date().toISOString()} - ${req.url}\n`;

fs.appendFile('log.txt', log, err => {
  if (err) console.error('日志写入失败:', err);
});

});




/*
	•	req 是 请求对象，包含请求头、路径、IP 等信息。
	•	res 是 响应对象，用来给客户端返回数据。
	•	res.end() 表示结束响应并发送内容。

*/


server.listen(8000, () => {
  console.log('Server started on port 8000');
});
