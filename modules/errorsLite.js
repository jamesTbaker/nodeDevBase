
/*********************************************************************
	PULL IN MODULES
*********************************************************************/

// enable use of "twitter" node module; this will allow us to tweet errors
var twitter = require('twitter');

// use the "settings" module; this allows us to get system-wide settings
var settings = require('./settings');
// use the "utilities" module; this allows us to use some date and time functions
var utilities = require('./utilities');



/*********************************************************************
	DEFINE SETTINGS FUNCTIONS
*********************************************************************/

var errorsLite = function () {

    var AddErrorToTwitter = function (errorData) {
        console.log("in the function");
        // return a new promise
        return new Promise(function (resolve, reject) {
            console.log("returned a promise");
            // try to post error to twitter
            try {
                // construct tweet based on errorData
                var errorTweet = utilities.ReturnFormattedDateTime('nowLocal', null, 'ddd, MM/DD, h:mm a');
                errorTweet += " - " + process.env.appName + " ";
                if (typeof (errorData.emergencyError) !== "undefined" && errorData.emergencyError === true) {
                    errorTweet += "Emergency Error: ";
                    if (typeof (errorData.emergencyErrorDetails) !== "undefined") {
                        errorTweet += errorData.emergencyErrorDetails + ".";
                    } else {
                        errorTweet += "No details available."
                    }
                } else {
                    errorTweet += "Standard Error.";
                }
                // get a twitter client using neso's twitter settings
                var client = new twitter({
                    consumer_key: process.env.skipBHelpTwitterConsumerKey,
                    consumer_secret: process.env.skipBHelpTwitterConsumerSecret,
                    access_token_key: process.env.skipBHelpTwitterAccessTokenKey,
                    access_token_secret: process.env.skipBHelpTwitterAccessTokenSecret
                });
                // attempt post error to Twitter
                client.post('statuses/update', { status: errorTweet }, function (tweetingError, tweet, response) {
                    // if there was an error posting to twitter
                    if (tweetingError) {
                        console.log(tweetingError);
                        // construct custom error object
                        var twitterErrorData = {
                            "error": true,
                            "twitterError": true,
                            "twitterErrorDetails": tweetingError
                        }
                        // resolve the promise with the error data
                        resolve(twitterErrorData);
                    } else {
                        resolve({ "error": false, "twitterError": false })
                    }
                });
            } catch (tweetingError) {
                // construct custom error object
                var twitterErrorData = {
                    "error": true,
                    "twitterError": true,
                    "twitterErrorDetails": tweetingError
                }
                // resolve the promise with the error data
                resolve(twitterErrorData);
            }
        });
    };

    return {
        AddErrorToTwitter: AddErrorToTwitter
    };
}();

module.exports = errorsLite;
