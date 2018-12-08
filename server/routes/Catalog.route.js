const keys = require('../config/keys');

const EntityMapper = require('../db/EntityMapper');

const ROW_COUNT = 10000;

const list = Array(ROW_COUNT).fill().map((val, id) => ({
    inn: id,
    name: `ООО "Ромашка - ${id}"`,
    offSite: 'http://yandex.ru',
    image: 'http://via.placeholder.com/40',
    generalDirector: 'Иванов Петр Петрович',
    address: 'Москва, ул Красный Октябрь д. 10 стр. 6',
    text: `Еще какой то текст`
  }));

module.exports = app => {

    app.get('/catalog', (req, res) => {
        const { inn, name, okved  } = req.query;
        global.db.collection('companies').find({ INN: {  $regex: `.*${inn}.*` }, COMPANY_SHORT_NAME: {  $regex: `.*${name}.*` }, COMPANY_FULL_NAME: {  $regex: `.*${name}.*` }, OKVED_CODE: {  $regex: `.*${okved}.*` } }).toArray(function(err, result) {
            console.log(err);
            //console.log(result);
            res.status(200).send({
                data: result,
                rowCount: result.length
            });
        })
   
    });


    app.get('/firm/:inn', (req, res) => {
        const { inn } = req.params;
        console.log('inn', inn);
        global.db.collection('companies').findOne({ INN: inn }, (err, result) => {
            console.log(err);
            // console.log(result);
            res.status(200).send({
                ...result
            });
        });

    });



};
