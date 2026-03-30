// 引入 express
const express = require('express');
const app = express();
const fs = require('fs');
const {sign} = require('./index.js');

app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.json({message: 'Hello from Node.js backend!'});
});

app.post('/api/data', (req, res) => {
    // eval(fs.readFileSync('myserver\\jingdong\\5.2.0\\env.js', 'utf8'))
    console.log('接收到数据:', req.body["params"]);
    res.json({status: 'success', result: sign(req.body["params"])});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});