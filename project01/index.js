const express = require('express');
const app = express();
const port = 8000;
const users = require('./users.json');



app.use(express.urlencoded({ extended: false })); // 处理 form-data 格式
app.use(express.json()); // 处理 JSON 格式



app.get('/api/users', (req, res) => {
    const html = `
<ul>
  ${users.map(user => `<li>${user.first_name}</li>`).join('')}
</ul>
`;

res.send(html);
});


app.post("/api/users", (req, res) => {
    const body = req.body
    console.log('Body', body)

    return res.json({ status: "pending" })
})


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


app.post('/api/users', (req, res) => {
    const body = req.body;
    const newUser = { id: users.length + 1, ...body };
    users.push(newUser);
    fs.writeFile('./mockData.json', JSON.stringify(users), err => {
        if (err) return res.status(500).send({ status: 'error', message: err });
        res.status(201).send({ status: 'success', id: newUser.id });
    });
});


app.patch('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) return res.status(404).send({ status: 'error', message: 'User not found' });

    users[userIndex] = { ...users[userIndex], ...body };
    fs.writeFile('./mockData.json', JSON.stringify(users), err => {
        if (err) return res.status(500).send({ status: 'error', message: err });
        res.send({ status: 'success', user: users[userIndex] });

    });
});


app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const newUsers = users.filter(u => u.id !== id);
    fs.writeFile('./mockData.json', JSON.stringify(newUsers), err => {
        if (err) return res.status(500).send({ status: 'error', message: err });
        res.send({ status: 'success', message: 'User deleted' });
    });
});
