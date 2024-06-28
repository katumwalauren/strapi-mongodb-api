import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from 'morgan'; 

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny')); 

app.get('/', function (req, res) {
  res.send('hello, world!')
})

const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
   });

