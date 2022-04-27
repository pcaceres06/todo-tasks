const express = require('express');
const api = require('./api');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// levartar servidor
app.listen(port, function(){
    console.log(`Server is listening at port: ${port}`);
});


app.get('/', function(req, res){
    res.send("Hola mundo");
});

app.use('/api', api);