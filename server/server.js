const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const bodyParser = require('body-parser');
var bunyan = require('bunyan');
const keys = require('./config/keys');


const app = express();
const port = process.env.PORT || 3000;
const client = new MongoClient(keys.mongoURI);

global.log = bunyan.createLogger({
  name : "startupclub",
  src : true,
  serializers: bunyan.stdSerializers,
  streams : [ {
    path : './catalog.log',
    type : 'file'
  } ]
});

client.connect(function(err) {

  if (err) {
    global.log.error(err);
  }

  global.db = client.db('mongo');
  global.log.info('succesfully connected to mongodb');
  console.log('succesfully connected to mongodb');
  // client.close();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/Catalog.route')(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Node.js server is listening at http://localhost:${port}/`);
  global.log.info(`server is started at port ${port}`);
});

// https://flaviocopes.com/node-exceptions/
process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err);
    global.log.error(err);
    process.exit(1); // mandatory (as per the Node docs)
})
