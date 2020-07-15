const express = require('express')
const app = express()
const port = 3001

const nwstat_model = require('./networkstat_model')
const { response } = require('express')


app.use(express.json())
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  	next();
});

//gets raw dump of all data
app.get('/GetAll', (req, res) => {
	nwstat_model.getNwStats()
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

//gets average down speed of all data
app.get('/AvgDown', (req, res) => {
	nwstat_model.getAvgDownSpeed()
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

//gets average down speed of all data
app.get('/AvgUp', (req, res) => {
	nwstat_model.getAvgUpSpeed()
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

//gets average down speed of all data
app.get('/AvgPing', (req, res) => {
	nwstat_model.getAvgPing()
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

//get yesterdays average down speed
app.get('/YdAvgDown', (req, res) => {
	nwstat_model.getLastDayAvgDown()
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

//get yesterdays average up speed
app.get('/YdAvgUp', (req, res) => {
	nwstat_model.getLastDayAvgUp()
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

//get yesterdays average ping
app.get('/YdAvgPing', (req, res) => {
	nwstat_model.getLastDayAvgPing()
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

//get yesterdays average ping
app.get('/YdAvgPing', (req, res) => {
	nwstat_model.getLastDayAvgPing()
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})


//returns the servers and how many tests have been run against each one
app.get('/ServerDistribution', (req, res) => {
	nwstat_model.getServerTestDist()
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

app.get('/GetHistoricalData', (req, res) => {
	nwstat_model.getHistoricalDataByDay()
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

//not tested 
// app.delete('/nwstats/:deldate', (req, res) => {
// 	nwstat_model.deleteNwStats(req.params.deldate)
// 	.then(response => {
// 		res.status(200).send(response);
// 	})
// 	.catch(error => {
// 		res.status(500).send(error);
// 	})
// })


app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})
