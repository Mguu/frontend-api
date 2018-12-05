const keys = require('../config/keys');



module.exports = app => {

    app.get('/catalog', (req, res) => {

        const {  } = req.body;

        res.status(200).send(`[
            "1234556689": { 
                "name": "ООО Ромашка",
                "address": "Москва, ул. Красный Октябрь, д. 33"
            }
        ]`)
    
    });


};