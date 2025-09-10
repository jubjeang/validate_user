require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const ActiveDirectory = require('activedirectory2')

const app = express()
app.use(cors())
app.use(bodyParser.json())
const http = require('http');
const server = http.createServer(app);
const dboperations = require('./controllers/dboperations');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get('/ping', (req,res)=>res.send('ok')); // ทดสอบ GET

app.use((req,res,next)=>{
  console.log('HIT', req.method, req.url);
  next();
});
app.post('/getuserinfo', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }

    const data_all = {
      username: username.toLowerCase(),
      password
    };

    const result = await dboperations.getuserinfo(data_all);
    console.log('result dboperations.getuserinfo', result);
    res.json(result[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

server.listen(process.env.PORT, () => {
    console.log(`Server running on https://localhost:${process.env.PORT}`);
});
