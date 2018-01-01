
/*********************************************************************
	PULL IN MODULES
*********************************************************************/

// use the "utilities" module; this contains misc JS functions
var utilities = require('./utilities');
// use the "dbConnection" module; this is sufficient to bring in the database connection
var dbConnection = require('./dbConnection');
// use the "dbQueries" module; this allows us to use some standardized and convenient query methods
var dbQueries = require('./dbQueries');
// use the "utilities" neso module; this allows us to use some date and time functions
var utilities = require('./utilities');



/*********************************************************************
	DEFINE SETTINGS FUNCTIONS
*********************************************************************/

var settings = function() {

	var ReturnSettings = function () {
		// return a new promise
		return new Promise(function (resolve, reject) {
			// get a promise to retrieve all documents from the settings document collection
			dbQueries.ReturnAllDocsFromCollection("settings")
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then(function (settings) { resolve(settings) })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch(function (error) { reject(error) });
		});
	};

	var ReturnHealthSettings = function () {
		// return a new promise
		return new Promise(function (resolve, reject) {
			// get a promise to retrieve all documents from the settings document collection
			dbQueries.ReturnAllDocsFromCollection("settings")
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then(function (settings) { resolve({ "error": settings.error, "health": settings["docs"][0]["health"] }) })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch(function (error) { reject(error) });
		});
	};

	var ReturnErrorSettings = function () {
		// return a new promise
		return new Promise(function (resolve, reject) {
			// get a promise to retrieve all documents from the settings document collection
			dbQueries.ReturnAllDocsFromCollection("settings")
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then(function (settings) { resolve({ "error": settings.error, "errors": settings["docs"][0]["errors"] }) })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch(function (error) { reject(error) });
		});
	};







	return {
		ReturnSettings: ReturnSettings,
		ReturnHealthSettings: ReturnHealthSettings,
		ReturnErrorSettings: ReturnErrorSettings
	};
}();

module.exports = settings;
