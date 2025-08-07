const fs = require('fs');


// Sync...
// fs.writeFileSync("./test.txt", "Hey I Love You")


// fs.writeFile('./test1.text', 'Hello', (err) => {
//   if (err) throw err;
//   console.log('写入成功');
// });


fs.writeFileSync('./test2.txt', 'Hello World!');


fs.readFile('./test2.txt', 'utf8', (err, data) => {
  if (err) console.error(err);
  else console.log(data);
});









