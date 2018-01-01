
/*********************************************************************
	PULL IN MODULE
*********************************************************************/

// enable use of "monk" node module; this provides "simple yet substantial usability improvements for MongoDB usage within Node.JS"
var monk = require('monk');



/*********************************************************************
	GET DB CONNECTION
*********************************************************************/

var dbConnection = monk(process.env.dbUser + ":" + process.env.dbPass + "@" + process.env.dbHost + ":" + process.env.dbPort + "/" + process.env.dbName);



/*********************************************************************
	EXPORT DB CONNECTION
*********************************************************************/

module.exports = dbConnection;