/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var githubHelper = require('./promisification.js');
var fileHelpers = require('./promiseConstructor.js');
var writeFile = Promise.promisify(fs.writeFile);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return fileHelpers.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(username) {
      return githubHelper.getGitHubProfileAsync(username);
    })
    .then(function(profile) {
      return JSON.stringify(profile, null, 2);
    })
    .then(function(profile) {
      return writeFile(writeFilePath, profile);
    })
    .catch(function(error) {
      console.log('error...', error);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
