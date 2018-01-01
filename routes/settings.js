
/*********************************************************************
	PULL IN MODULES, GET EXPRESS ROUTER
*********************************************************************/

// use the "express" node module; this is our app framework, including our HTTP server
var express = require('express');
// use the "settings" module; this allows us to get system-wide settings
var settings = require('../modules/settings');

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
	settings.ReturnSettings()
	// if the promise is resolved with the docs, then respond with the docs as JSON
	.then(function (result) { res.json(result) })
	// if the promise is rejected with an error, then respond with the error as JSON
	.catch(function (error) { res.json(error) });
});

// GET /health
// for GET request for /health
router.get('/health', function (req, res, next) {
	// get a promise to retrieve all error data
	settings.ReturnHealthSettings()
	// if the promise is resolved with the docs, then respond with the docs as JSON
	.then(function (result) { res.json(result) })
	// if the promise is rejected with an error, then respond with the error as JSON
	.catch(function (error) { res.json(error) });
});

// GET /error
// for GET request for /error
router.get('/error', function (req, res, next) {
	// get a promise to retrieve all error data
	settings.ReturnErrorSettings()
	// if the promise is resolved with the docs, then respond with the docs as JSON
	.then(function (result) { res.json(result) })
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
