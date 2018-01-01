
/*********************************************************************
	PULL IN MODULES
*********************************************************************/

// use the "dbQueries" module; this allows us to use some standardized and convenient query methods
var dbQueries = require('./dbQueries');
// use the "settings" neso module; this allows us to get system-wide settings
var settings = require('./settings');
// use the "utilities" neso module; this allows us to use some date and time functions
var utilities = require('./utilities');
// use the "errorsLite" module; this allows us to record errors
var errorsLite = require('../modules/errorsLite');



/*********************************************************************
	DEFINE SETTINGS FUNCTIONS
*********************************************************************/

var errors = function() {

	var ReturnErrors = function () {
		// return a new promise
		return new Promise(function (resolve, reject) {
			// get a promise to retrieve all documents from the settings document collection
			dbQueries.ReturnAllDocsFromCollection("errors")
			// if the promise is resolved with the docs, then resolve this promise with the docs
			.then(function (settings) { resolve(settings) })
			// if the promise is rejected with an error, then reject this promise with an error
			.catch(function (error) { reject(error) });
		});
	};

	var AddErrorToLog = function(errorData) {

		// todo: add req.headers.referer

		errorData.errorTime = utilities.ReturnFormattedDateTime('nowUTC', null, null);

		// return a new promise
		return new Promise(function(resolve, reject) {
			// if this is NOT a db error; log is in db, so trying to add an error to db while db is problematic creates a circularity;
			// 		db errors in db log file
			if (typeof(errorData.mongoDBError) === "undefined" || errorData.mongoDBError === false) {
				// get a promise to retrieve all documents from the emailQueue document collection
				dbQueries.InsertDocIntoCollection(errorData, 'errors')
				// if the promise is resolved with the result, then resolve this promise with the result
				.then(function(result) { resolve(result) })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch(function (error) { resolve(error) });
			// if this is a db error
			} else {
				resolve({"error": false});
			}
		});
	};

	var ProcessError = function(errorData) {
		// return a new promise
		return new Promise(function(resolve, reject) {
			// get promises to async add error to twitter and to async add error to log
			Promise.all([errorsLite.AddErrorToTwitter(errorData), AddErrorToLog(errorData)])
			// when all promises have resolved
			.then(function(twitterAndLogResults) {
				// extract results for convenience
				var twitterResults = twitterAndLogResults[0];
				var logResults = twitterAndLogResults[1];
				// start constructing the result, defaulting to no errors
				var result = { "error": false };
				// if there was a twitter error that isn't just a duplicate status warning (code 187)
				if (twitterResults.error === true && typeof(twitterResults.twitterErrorDetails) !== "undefined" && twitterResults["twitterErrorDetails"][0]["code"] !== 187) {
					// make sure error is true and collect twitter error info
					result.error = true;
					result.twitterError =  twitterResults.twitterError;
					result.twitterErrorDetails = twitterResults.twitterErrorDetails;
				// if there was no twitter error (or there was only the duplicate status warning (code 187))
				} else {
					// collect twitter error info
					result.twitterError =  twitterResults.twitterError;
				}
				// if there was a log error
				if (logResults.error === true) {
					// make sure error is true and collect log error info
					result.error = true;
					result.mongoDBError =  logResults.mongoDBError;
					result.mongoDBErrorDetails = logResults.mongoDBErrorDetails;
				// if there was no log error
				} else {
					// collect log error info
					result.mongoDBError =  false;
				}
				resolve(result);
			})
			.catch(function(error) {
				console.log(error);
			});
		});
	};


	return {
		ReturnErrors: ReturnErrors,
		AddErrorToLog: AddErrorToLog,
		ProcessError: ProcessError
	};
}();

module.exports = errors;
