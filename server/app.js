var express = require('express');
var app = express();
const path = require('path');
const db = require('../database/db.js')

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(3000, () => { console.log('app is listening on port 3000'); });

app.post('/user', (req, res) => {
  console.log(req.body);
  db.addInfo(req.body.username, req.body.email, (err, result) => {
    console.log('DATA INSERTED TO DB')
    if (err) {
      console.log(err)
    } else {
      console.log(result);
    }
  })
})

app.get('/count', (req, res) => {

});

app.post('/bet', (req, res) => {

});

