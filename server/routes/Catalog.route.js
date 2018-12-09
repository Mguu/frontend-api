const keys = require('../config/keys');
const axios = require('axios');
const fs = require('fs');

// const t = { access_token:"65a2944572cdf92155133c72531f886f5448c7996d1f6bade50d7b6fc674915723c78160f8f6ddcb13a16",expires_in:86400, user_id:12680198 }
const t ={ access_token: '15ddaa2e468e337ec8187554a1a0a1623806d201a36e6b435b5fe1f0f3a4ff55e2f1e447a95ba54a62f90' };


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

    app.get('/verify', (req, res) => {
        const { code } = req.query;
        console.log('query', code);
        if (!code) return;
        axios.get(`https://oauth.vk.com/access_token?client_id=6777108&client_secret=TjXq0EPWb7yd4QDIj1MV&redirect_uri=http://u4.startup-club.tech/verify&code=${code}`)
        .then(resp => {
            console.log(resp.data);
            fs.writeFile("/token.json", resp.data, function(err) {
                if(err) {
                    console.log(err);
                    res.status(500).send(error);
                }
                console.log("The file was saved!");
                res.status(200).send(resp.data);
            }); 
          })
          .catch(error => {
            //res.status(500).send(error);
            console.log(error)
            res.status(500).send(error);
          });
    });


    app.get('/getvkdata', (req, res) => {
        const { q } = req.query;
        console.log('q', q);
        axios.get(`https://api.vk.com/method/users.search?q=${encodeURIComponent(q)}&fields=photo_50,contacts&sort=0&access_token=${t.access_token}&v=V`)
        .then(resp => {
            console.log(resp.data);
            res.status(200).send(resp.data);
          })
          .catch(error => {
            console.log(error)
            res.status(500).send(error);
          });
        

    });



};
