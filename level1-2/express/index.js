const express = require('express')
const app = express()
const port = 3000
let number =  require("fs").readFileSync("number.txt");

app.get('/', (req, res) => {
    res.send(`<h1>Page has visted : ${++number}</h1>`);
    require("fs").writeFileSync("number.txt",String(number));
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})