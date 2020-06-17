const express = require('express')
const app = express()
const port = 3001

const nwstat_model = require('./networkstat_model')


app.use(express.json())
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  	next();
});

app.get('/', (req, res) => {
	nwstat_model.getNwStats()
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})


app.delete('/nwstats/:deldate', (req, res) => {
	nwstat_model.deleteNwStats(req.params.deldate)
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})


app.listen(port, () => {
	console.log('App running on port ${port}.')
})
