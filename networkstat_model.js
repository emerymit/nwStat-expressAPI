const Pool = require('pg').Pool
const pool = new Pool({
	user: 'amigo',
	host: 'localhost',
	database: '5155_networkstats',
	password: 'burlington',
	port: 5432,
});

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

module.exports = {
	getNwStats,
	deleteNwStats,
}
