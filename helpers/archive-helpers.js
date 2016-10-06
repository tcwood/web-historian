var fs = require('fs');
var path = require('path');
var _ = require('underscore');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  //Split on new line characters
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    var splitArr = data.split('\n');
    callback(splitArr);
  });
};

exports.isUrlInList = function(target, callback) {
  //Assign a variable to the result of readListOfUrls

  exports.readListOfUrls( array => {
    callback(array.indexOf(target) >= 0);
  });

};

exports.addUrlToList = function() {
};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};
