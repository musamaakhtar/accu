import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import Connection from './database/db.js'
import router from './routes/route.js';
const app = express();
app.use(cors())
const password = "usama";
const db = "ACU" ;
const PORT =process.env.PORT || 5000 ;
const URL =process.env.MONGODB_URI || 'mongodb+srv://ACU:1234@cluster0.zi8y9jz.mongodb.net/?retryWrites=true&w=majority';
// const URL = 'mongodb+srv://hannan:farhan@cluster0.d7qcp.mongodb.net/Accu?retryWrites=true&w=majority';
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(PORT, () => console.log(`Server is running on this port: ${PORT}`));
app.get("/", (req, res) => {
    res.send("<h1>hurrah! Your Server is Running Now.... By(usama Rajpoot)</h1>");
  });
app.use('/', router)
Connection(URL);