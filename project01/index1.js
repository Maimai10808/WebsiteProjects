const express = require('express');
const app = express();

// 中间件 1：打印日志
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // 交给下一个中间件
});

// 中间件 2：给 req 添加自定义属性
app.use((req, res, next) => {
  req.myUserName = 'Piyush Garg';
  next();
});


const fs = require('fs');
app.use((req, res, next) => {
  const log = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
  fs.appendFile('access.log', log, (err) => {
    if (err) console.error(err);
  });
  next();
});

// 路由处理
app.get('/users', (req, res) => {
  res.send(`Hello ${req.myUserName}`);
});

app.listen(3000, () => console.log('Server running on port 3000'));



// 中间件 1：打印日志
app.use((req, res, next) => {
  console.log('Middleware 1');
  next(); // 放行
});

// 中间件 2：加一个属性
app.use((req, res, next) => {
  req.myUserName = 'Piyush';
  next(); // 放行
});

// 最终路由处理
app.get('/users', (req, res) => {
  res.json({ msg: `Hello ${req.myUserName}` });
});
