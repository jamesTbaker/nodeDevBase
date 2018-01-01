
/*********************************************************************
	PULL IN MODULES, GET EXPRESS ROUTER
*********************************************************************/

// use the "express" node module; this is our app framework, including our HTTP server
var express = require('express');
// use the "errorsLite" module; this allows us to record errors
var errorsLite = require('../modules/errorsLite');
// use the "errors" module; this allows us to record errors
var errors = require('../modules/errors');

// pull out express's router method
var router = express.Router();



/*********************************************************************
	CONFIG EXPRESS ROUTER
*********************************************************************/

//--------  BACKEND  ------------------------------------------------//

//--------  GET (READ)

// GET /
// for GET request for /
router.get('/', function (req, res, next) {
	// get a promise to retrieve all error data
	errors.ReturnErrors()
		// if the promise is resolved with the docs, then respond with the docs as JSON
		.then(function (result) { res.json(result) })
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch(function (error) { res.json(error) });
});



//--------  POST (CREATE)

// POST /log
// for POST requests for /log
router.post('/log', function (req, res) {
	console.log("got here");
	// get a promise to insert the error (request body) into the queue
	errors.AddErrorToLog(req.body)
	// if the promise is resolved with the result, then respond with the result as JSON
	.then(function (result) { res.json(result) })
	// if the promise is rejected with an error, then respond with the error as JSON
	.catch(function (error) { res.json(error) });
});

// POST /twitter
// for POST requests for /twitter
router.post('/twitter', function (req, res) {
	// get a promise to insert the error (request body) into the queue
	errorsLite.AddErrorToTwitter(req.body)
		// if the promise is resolved with the result, then respond with the result as JSON
		.then(function (result) { res.json(result) })
		// if the promise is rejected with an error, then respond with the error as JSON
		.catch(function (error) { res.json(error) });
});

// POST /process
// for POST requests for /process
router.post('/process', function(req, res) {
	// get a promise to insert the error (request body) into the queue
	errors.ProcessError(req.body)
	// if the promise is resolved with the result, then respond with the result as JSON
	.then(function(result) { res.json(result) })
	// if the promise is rejected with an error, then respond with the error as JSON
	.catch(function (error) { res.json(error) });
});



//--------  CONSOLE / DOCUUMENTATION  -------------------------------//

// GET /admin
// for GET requests for /admin
/*router.get('/admin', function(req, res) {
	// respond with a render of the errors/adminConsole view
	res.render('settings/adminConsole', { title: 'Settings Admin Console' });
});*/



/*********************************************************************
	EXPORT EXPRESS ROUTER
*********************************************************************/

module.exports = router;