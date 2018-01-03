/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */

var fs = require('fs');
var Promise = require('bluebird');
var writeFile = Promise.promisify(fs.writeFile);

var pluckFirstLineOfFile = function(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        var firstLine = data.split('\n')[0];
        resolve(firstLine);
      }
    });
  });
};

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  var promises = filePaths.map((filePath) => pluckFirstLineOfFile(filePath));
  return Promise.all(promises)
    .then(function(firstLineOfFiles) {
      var newFile = JSON.stringify(firstLineOfFiles.join('\n'));
      return writeFile(writePath, newFile);
    });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};
