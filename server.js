
const express = require('express');
const config=require('./app/config/dev.config');

//app configureation
const app = express();
const server = require('http').createServer(app);
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || config.port;

//mongodb configuration
let mongo_uri = config.mongoURI;
const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.connect(mongo_uri, {useNewUrlParser:true})
  .then(()=>console.log("MongoDB successfully connected"))
  .catch(err=>console.log((err)));
/*const MongoClient=require('mongodb').MongoClient;
  // Set up the connection to the local db
  const client = new MongoClient(mongo_uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("test").collection("devices");
   // perform actions on the collection object
    client.close();
  });*/


//use body parser as middleware
app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
    type: 'application/x-www-form-urlencoded'
}))

app.use(bodyParser.json({
    limit: '500mb',
    type: 'application/*'
}))

//router configuration
fs.readdirSync('./app/routes').forEach((file) => {
  router.use(`/${path.parse(file).name.split('.')[0]}`, require(`./app/routes/${file}`)(express.Router()));
})

app.use(router)

// if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV === undefined) {
server.listen(port, () => {
    console.log(`Server active at http://localhost:${port} on ID: ${process.pid}`)
})
// } else {
//     exports.server = server
// }
