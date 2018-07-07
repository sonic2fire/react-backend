require('../password');

var express = require('express');
var app = express();
var router = express.Router();
const editJsonFile = require("edit-json-file");
let file = editJsonFile('./cards.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/cards', function(req, res) {
    console.log(req.body);
    console.log(password.pas);

    if (req.body.pas === password.pas) {
        obj = file.toObject();
        order = obj.cards.length;
        card = req.body;
        card.order = order;
        cards = obj.cards.concat(card);
        file.set("cards", cards);
        file.save();

        console.log(file.toObject());
        obj = file.toObject();

        res.send('Card was successfully created');
    }
    else
        res.send('wrong password');
});

router.get('/cards', function (req, res, next) {

    obj = file.toObject();
    cards = obj.cards;
    res.send(cards);
});

router.post('/deleteAll', function (req, res, next) {
    console.log(req.body);
    if (req.body.pas === 123123) {
        file.set("cards", []);
        res.send('Cards deleted');
    }
    else
        res.send('error wrong password');
});



module.exports = router;
