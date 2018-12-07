const keys = require('../config/keys');

const ROW_COUNT = 100000;

const list = Array(ROW_COUNT).fill().map((val, id) => ({
    id,
    name: 'John Doe',
    image: 'http://via.placeholder.com/40',
    text: `ООО "Ромашка - ${id}"`
  }));

module.exports = app => {

    app.get('/catalog', (req, res) => {
        console.log('catalog', req.query);
        res.status(200).send({
            data: list.slice(parseInt(req.query.startIndex), parseInt((req.query.stopIndex))),
            rowCount: ROW_COUNT
        });
    
    });


};