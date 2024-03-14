import express from 'express'
const PORT = 8000

const app = express()

app.get('/', (req, res) => {
  res.send('Hello from Express my bro')
})

app.listen(PORT, () => {
  console.log(`Now listening on PORT: ${PORT}`)
})