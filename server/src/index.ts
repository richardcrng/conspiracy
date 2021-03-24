import express from "express";
import cors from 'cors';

const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'hi!' })
})

app.listen(4000, () => {
  console.log('server listening')
})