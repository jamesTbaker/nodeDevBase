
/*********************************************************************
	PULL IN MODULES
*********************************************************************/

// use the "dbConnection" module; this is sufficient to bring in the database connection
var dbConnection = require('./dbConnection');
// use the "errorsLite" module; this allows us to record errors
var errorsLite = require('../modules/errorsLite');


/*********************************************************************
	DB QUERY WRAPPER FUNCTIONS
*********************************************************************/

var dbQueries = function() {

    var ReturnAllDocsFromCollection = function(collection) {
		// return a new promise
        return new Promise(function (resolve, reject) {
			// using the dbConnection object, get the specified collection from the db; that is, use the db connection
			//      to fill the docs var with db documents; use find method with empty query and options
			//      objects to select all docs and invoke callback
            dbConnection.get(collection).find({}, {}, function (error, docs) {
                // if there was an error
                if (error) {
                    // construct a custom error
                    var errorToReport = {
                        "error": true,
                        "mongoDBError": true,
                        "mongoDBErrorDetails": error
                    };
                    // add error to Twitter
                    errorsLite.AddErrorToTwitter(errorToReport);
                    // reject this promise with the error
                    reject(errorToReport);
                    // if there was NOT an error
                } else {
                    // resolve the promise and return the docs
                    resolve({
                        "error": false,
                        "mongoDBError": false,
                        "docs": docs
                    });
                }
            });
        });
    };

    var InsertDocIntoCollection = function (doc, collection) {
        // return a new promise
        return new Promise(function (resolve, reject) {
            // using the dbConnection object, get the specified collection from the db; that is, use the db connection
            //      to fill the docs var with db documents; use find method with empty query and options
            //      objects to select all docs and invoke callback
            dbConnection.get(collection).insert(doc, function (error, result) {
                // if there was an error
                if (error) {
                    // construct a custom error
                    var errorToReport = {
                        "error": true,
                        "mongoDBError": true,
                        "mongoDBErrorDetails": error
                    };
                    // add error to Twitter
                    errorsLite.AddErrorToTwitter(errorToReport);
                    // reject this promise with the error
                    reject(errorToReport);
                    // if there was NOT an error
                } else {
                    // resolve the promise and return the result
                    resolve({
                        "error": false,
                        "mongoDBError": false,
                        "docs": result
                    });
                }
            });
        });
    };

    var OverwriteDocInCollection = function (docID, doc, collection) {
        // return a new promise
        return new Promise(function (resolve, reject) {
            // using the dbConnection object, get the specified collection from the db; that is, use the db connection
            //      to fill the docs var with db documents; use find method with empty query and options
            //      objects to select all docs and invoke callback
            dbConnection.get(collection).update({ '_id': docID }, doc, function (error, countsFromMonk) {
                // if there was an error
                if (error) {
                    // construct a custom error
                    var errorToReport = {
                        "error": true,
                        "mongoDBError": true,
                        "mongoDBErrorDetails": error
                    };
                    // add error to Twitter
                    errorsLite.AddErrorToTwitter(errorToReport);
                    // reject this promise with the error
                    reject(errorToReport);
                    // if there was NOT an error
                } else {
                    // resolve the promise and return the counts of what happened (with more meaningful labels)
                    var docCounts = {};
                    if (typeof (countsFromMonk.n) !== "undefined") { docCounts.matchedDocs = countsFromMonk.n; }
                    if (typeof (countsFromMonk.nModified) !== "undefined") { docCounts.modifiedDocs = countsFromMonk.nModified; }
                    resolve({
                        "error": false,
                        "mongoDBError": false,
                        "docCounts": docCounts
                    });
                }
            });
        });
    };

    var DeleteDocFromCollection = function (docID, collection) {
        // return a new promise
        return new Promise(function (resolve, reject) {
            // using the dbConnection object, get the specified collection from the db; that is, use the db connection
            //      to fill the docs var with db documents; use find method with empty query and options
            //      objects to select all docs and invoke callback
            dbConnection.get(collection).remove({ '_id': docID }, function (error, resultFromMonk) {
                // if there was an error
                if (error) {
                    // construct a custom error
                    var errorToReport = {
                        "error": true,
                        "mongoDBError": true,
                        "mongoDBErrorDetails": error
                    };
                    // add error to Twitter
                    errorsLite.AddErrorToTwitter(errorToReport);
                    // reject this promise with the error
                    reject(errorToReport);
                    // if there was NOT an error
                } else {
                    // resolve the promise and return the counts of what happened (with more meaningful labels)
                    var docCounts = {};
                    if (typeof (resultFromMonk.result.n) !== "undefined") { docCounts.matchedDocs = resultFromMonk.result.n; }
                    if (typeof (resultFromMonk.result.ok) !== "undefined") { docCounts.deletedDocs = resultFromMonk.result.ok; }
                    resolve({
                        "error": false,
                        "mongoDBError": false,
                        "docCounts": docCounts
                    });
                }
            });
        });
    };

    var DeleteAllDocsFromCollection = function (collection) {
        // return a new promise
        return new Promise(function (resolve, reject) {
            // using the dbConnection object, get the specified collection from the db; that is, use the db connection
            //      to fill the docs var with db documents; use find method with empty query and options
            //      objects to select all docs and invoke callback
            dbConnection.get(collection).remove({}, function (error, resultFromMonk) {
                // if there was an error
                if (error) {
                    // construct a custom error
                    var errorToReport = {
                        "error": true,
                        "mongoDBError": true,
                        "mongoDBErrorDetails": error
                    };
                    // add error to Twitter
                    errorsLite.AddErrorToTwitter(errorToReport);
                    // reject this promise with the error
                    reject(errorToReport);
                    // if there was NOT an error
                } else {
                    // resolve the promise and return the counts of what happened (with more meaningful labels)
                    var docCounts = {};
                    if (typeof (resultFromMonk.result.n) !== "undefined") { docCounts.matchedDocs = resultFromMonk.result.n; }
                    if (typeof (resultFromMonk.result.ok) !== "undefined") { docCounts.deletedDocs = resultFromMonk.result.ok; }
                    resolve({
                        "error": false,
                        "mongoDBError": false,
                        "docCounts": docCounts
                    });
                }
            });
        });
    };


    return {
        ReturnAllDocsFromCollection: ReturnAllDocsFromCollection,
        InsertDocIntoCollection: InsertDocIntoCollection,
        OverwriteDocInCollection: OverwriteDocInCollection,
        DeleteDocFromCollection: DeleteDocFromCollection,
        DeleteAllDocsFromCollection: DeleteAllDocsFromCollection

    };
}();

module.exports = dbQueries;