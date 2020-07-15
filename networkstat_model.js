//Base set up for db connection
const Pool = require('pg').Pool
const pool = new Pool({
	user: 'amigo',
	host: 'localhost',
	database: '5155_networkstats',
	password: 'burlington',
	port: 5432,
});

//returns raw dump of values, ordered by time descending 
const getNwStats = () => {
	return new Promise (function(resolve, reject) {
		pool.query('SELECT * FROM networkstats ORDER BY time DESC', (error, results) => {
			if(error) {
				reject (error)
			}
			resolve(results.rows);
		})
	})
}

//deletes entries older than specified time date
const deleteNwStats = () => {
	return new Promise(function(resolve, reject){
		const deldate = Date.parse(request.params.deldate)
		pool.query('DELETE FROM networkstats WHERE time < $1', [deldate], (error, results) => {
			if(error){
				reject(error)
			}
			resolve('executed successfully')
		})
	})
}

//returns the average download speed
const getAvgDownSpeed = () => {
	return new Promise (function(resolve, reject) {
		pool.query('SELECT AVG(download) FROM networkstats', (error, results) => {
			if(error) {
				reject (error)
			}
			resolve(results.rows);
		})
	})
}

//returns the average upload speed
const getAvgUpSpeed = () => {
	return new Promise (function(resolve, reject) {
		pool.query('SELECT AVG(upload) FROM networkstats', (error, results) => {
			if(error) {
				reject (error)
			}
			resolve(results.rows);
		})
	})
}

//returns the average ping
const getAvgPing = () => {
	return new Promise (function(resolve, reject) {
		pool.query('SELECT AVG(ping) FROM networkstats', (error, results) => {
			if(error) {
				reject (error)
			}
			resolve(results.rows);
		})
	})
}

//get yesterdays (back from last test) avg down
const getLastDayAvgDown = () => {
	return new Promise (function(resolve, reject) {
		pool.query('select AVG(download) FROM (SELECT download FROM networkstats order by time desc LIMIT 48) as AverageDown', (error, results) => {
			if(error) {
				reject (error)
			}
			resolve(results.rows);
		})
	})
}

//get yesterdays (back from last test) avg up 
const getLastDayAvgUp = () => {
	return new Promise (function(resolve, reject) {
		pool.query('select AVG(upload) FROM (SELECT upload FROM networkstats order by time desc LIMIT 48) as AverageUp', (error, results) => {
			if(error) {
				reject (error)
			}
			resolve(results.rows);
		})
	})
}

//get yesterdays (back from last test) avg ping
const getLastDayAvgPing = () => {
	return new Promise (function(resolve, reject) {
		pool.query('select AVG(ping) FROM (SELECT ping FROM networkstats order by time desc LIMIT 48) as AveragePing', (error, results) => {
			if(error) {
				reject (error)
			}
			resolve(results.rows);
		})
	})
}

//returns all the servers and the total tests run against each target
const getServerTestDist = () => {
	return new Promise (function(resolve, reject) {
		pool.query('select serverloc, COUNT(serverloc) as TestCount from networkstats group by serverloc order by TestCount DESC', (error, results) => {
			if(error) {
				reject (error)
			}
			resolve(results.rows);
		})
	})
}

//get the lasts days (back from now) raw dump of up down and time 
const getUpDownTimeLastDay = () => {
	return new Promise(function(resolve, reject) {
		pool.query('select upload, download, time from networkstats order by time desc limit 48', (error, results) => {
			if(error) {
				reject (error)
			}
			resolve(results.rows);
		})
	})
}

//Functions for graphs
//average up down and ping, by day, for days that have EXACTLY 48 data points
const getHistoricalDataByDay = () => {
	return new Promise(function(resolve, reject) {
		pool.query(
		`select 
			date_trunc('day', time) as days, 
			AVG(download) as download,
			AVG(upload) as upload,
			AVG(ping) as ping,
			count(download) as dailycount 
		from networkstats 
		group by days
		having count(download) = 48
		order by days desc`, (error, results) => {
			if(error){
				reject (error)
			}
			resolve(results.rows);
		})
	})
}


module.exports = {
	getNwStats,
	deleteNwStats,
	getAvgDownSpeed,
	getAvgUpSpeed,
	getAvgPing,
	getLastDayAvgDown,
	getLastDayAvgUp,
	getLastDayAvgPing,
	getServerTestDist,
	getUpDownTimeLastDay,
	getHistoricalDataByDay,
}
