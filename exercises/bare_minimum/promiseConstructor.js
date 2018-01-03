/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  return new Promise( (resolve, reject) => {
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        console.log('error...\n', err);
        reject(err);
      } else {
        var firstLine = data.split('\n')[0];
        console.log('success...\n', firstLine);
        resolve(firstLine);
      }
    });
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  return new Promise ((resolve, reject) => {
    request(url, function(err, response, body) {
      if (err || !response) {
        console.log('error...\n', err);
        reject(err);
      } else {
        console.log('success!\n', response.statusCode);
        resolve(response.statusCode);
      }
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
