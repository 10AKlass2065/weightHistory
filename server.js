const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 8080;

app.use(express.json())

app.use(cors());

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

const uri = "mongodb+srv://StaRen:z5YpLm5stHUkNbyk@cluster0.czbdn.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {

    require('./routes')(app, client.db('Cluster0'));

    app.get('/ping', function (req, res) {
        return res.send('pong');
    });

    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});