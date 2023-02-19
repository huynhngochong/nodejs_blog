const express = require('express')
const app = express()
const port = 3000

//route
app.get('/tin-tuc', (req, res) => {
    var  a = 5;
    var b = 5;
    var c = a + b;
  res.send('Hello Hong')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})