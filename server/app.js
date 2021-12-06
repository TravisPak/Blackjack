var express = require('express');
var app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(3000, () => { console.log('app is listening on port 3000'); });

app.post('/user', (req, res) => {
  console.log(req.body);
})

app.get('/count', (req, res) => {

});

app.post('/bet', (req, res) => {

});

