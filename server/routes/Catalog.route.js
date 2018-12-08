const keys = require('../config/keys');

const ROW_COUNT = 100000;

const list = Array(ROW_COUNT).fill().map((val, id) => ({
    inn: id,
    name: `ООО "Ромашка - ${id}"`,
    image: 'http://via.placeholder.com/40',
    text: `Еще какой то текст`
  }));

module.exports = app => {

    app.get('/catalog', (req, res) => {
        res.status(200).send({
            data: list,
            rowCount: ROW_COUNT
        });
    
    });


};