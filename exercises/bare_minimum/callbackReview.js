/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log('error reading file...\n', err);
      callback(err, null);
    }
    var firstLine = data.split('\n')[0];
    console.log('success!\n', firstLine);
    callback(null, firstLine);
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request(url, function(err, response, body) {
    if (err || !response) {
      console.log('error...\n', err);
      callback(err, null);
    } else {
      console.log('success!\n', response.statusCode);
      callback(null, response.statusCode);
    }  
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
