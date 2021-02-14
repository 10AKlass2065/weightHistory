const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const cors = require('cors');
const port = 8000;

app.use(express.json())

app.use(cors());

const uri = "mongodb+srv://StaRen:z5YpLm5stHUkNbyk@cluster0.czbdn.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {

    require('./routes')(app, client.db('Cluster0'));

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});