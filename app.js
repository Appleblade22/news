const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/js'));

//Templating engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

//Routes
const newsRouter = require('./src/routes/news');

app.use('/', newsRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));