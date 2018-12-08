const keys = require('../config/keys');

const ROW_COUNT = 10000;

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

    app.get('/catalog/:inn', (req, res) => {
        const { inn } = req.params;
        console.log('inn', inn);
        const firm = {
            inn,
            name: `ООО "Ромашка - ${inn}"`,
            offSite: 'http://yandex.ru',
            address: 'Москва, ул Красный Октябрь д. 10 стр. 6',
            image: 'http://via.placeholder.com/40',
            text: `Еще какой то текст` 
        }
        console.log(firm);
        res.status(200).send(firm);
    });



};
