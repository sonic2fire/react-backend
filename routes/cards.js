var express = require('express');
var app = express();
var jsonfile = require('jsonfile')
var file = '../public/cards.json'

/* GET users listing. */
app.post('/', function(req, res) {

	obj = req.object

	jsonfile.writeFile(file, obj, {flag:'a'}, function (err) {
		console.error(err)
	})

  	res.send('Card was successfully created')
});

module.exports = router;