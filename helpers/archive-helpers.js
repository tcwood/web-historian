var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../web/archives/sites'),   //CHANGED TO INCLUDE WEB
  list: path.join(__dirname, '../web/archives/sites.txt')         //CHANGED TO INCLUDE WEB
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
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) {
    } else {
      var splitArr = data.split('\n');
      //This stops the occurance of empty urls.Can possibly remove later if we properly fix it
      var newSplitArr = _.filter(splitArr, item => item);
      callback(newSplitArr);
    }
  });
};

exports.isUrlInList = function(target, callback) {
  exports.readListOfUrls( array => {
    callback(array.indexOf(target) >= 0);
  });
};

exports.addUrlToList = function(url, callback) {
  exports.readListOfUrls( array => {
    array.push(url);
    var urlString = array.join('\n');
    fs.writeFile(exports.paths.list, urlString, 'utf8', callback);
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.access(exports.paths.archivedSites + '/' + url, (err) => {
    callback(!(err));
  });
};

exports.downloadUrls = function(array) {
  _.each(array, url => {
    exports.isUrlArchived(url, exists => {
      if (!exists) {
        exports.downloadOneUrl(url);
      } 
    });
  });

  exports.downloadOneUrl = function(url) {
    request({
      uri: 'http://www' + url,
    }, function(error, response, body) {
      fs.writeFile(exports.paths.archivedSites + '/' + url, body, err => {
        console.log(err);
      });
    });
  };
};
