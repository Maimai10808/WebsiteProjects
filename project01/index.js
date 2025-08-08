const express = require('express');
const app = express();
const port = 8000;
const users = require('./users.json');



app.get('/users', (req, res) => {
    const html = `
<ul>
  ${users.map(user => `<li>${user.first_name}</li>`).join('')}
</ul>
`;

res.send(html);
});


app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id); // 路径里的 id
  const user = users.find(u => u.id === id);
  res.json(user);
});

app.route('/api/users/:id')
  .get((req, res) => { /* 获取 */ })
  .patch((req, res) => { /* 更新 */ })
  .delete((req, res) => { /* 删除 */ });


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
