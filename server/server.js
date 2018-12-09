const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors');
var bunyan = require('bunyan');
const keys = require('./config/keys');
//const MongoClient = require('mongodb').MongoClient;
const MongoClient = require('mongodb').MongoClient;
//const Server = require('mongodb').Server;

//const client = new MongoClient('mongodb://mongodb:itstimeformongodb@68.183.76.109:27017');
/*var client = new MongoClient(new Server('68.183.76.109', 27017));
client.open(function(err, client) {
  if (err) {
    global.log.error(err);
    console.log(err);
  }

  global.db = client.db('crawlerDataset');
});*/

MongoClient.connect('mongodb://mongodb:itstimeformongodb@68.183.76.109:27017', function(err, db) {
    if (err) {
      global.log.error(err);
      console.log(err);
    }
    global.db = db.db('crawlerDataset');
    console.log(db, global.db)
  });

// const EntityMapper = require('./db/EntityMapper');


//var neo4j = require('neo4j-driver').v1;
//global.driver = neo4j.driver("bolt://68.183.76.109:7687", neo4j.auth.basic('neo4j','itstimeforneo4j'));


const app = express();
const port = process.env.PORT || 3000;
// const client = new MongoClient(keys.mongoURI);

global.log = bunyan.createLogger({
  name : "startupclub",
  src : true,
  serializers: bunyan.stdSerializers,
  streams : [ {
    path : './catalog.log',
    type : 'file'
  } ]
});

/*client.connect(function(err) {

  if (err) {
    global.log.error(err);
    console.log(err);
  }

  setTimeout(() => { 
    global.db = client.db('crawlerDataset');
    console.log('succesfully connected to mongodb', global.db);
  }, 2000);
});*/

app.use(cors());

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
