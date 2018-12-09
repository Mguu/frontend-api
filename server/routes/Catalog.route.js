const keys = require('../config/keys');



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


    app.get('/okvedstats', (req, res) => {
    
        global.db.collection('companies').aggregate([{$group: { _id: "$OKVED_CODE", cnt: {$sum: 1} } }, { $sort: { cnt: 1 } }]).toArray((err, result) => {
            console.log(err);
            //console.log(result);
            res.status(200).send(result);
        });

    });




};
