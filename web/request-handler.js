var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //Get the html of the index.html into a variable
  if (req.method === 'GET' || req.method === 'OPTIONS') {
    var index;

    //Check if req url == /
    if (req.url === '/' || req.url === '/index.html') {
      //If it does then set the index to archive.paths.siteAssets + index.html
      index = archive.paths.siteAssets + '/' + 'index.html';
    } else {
      // set index to archive.paths.archivedSites + /req.url
      index = archive.paths.archivedSites + '/' + req.url;
    }

    //Read the contents of index.html
    fs.readFile(index, (err, data) => {
      res.writeHead(200, httpHelpers.headers);
      res.end(data);
    });
    


  }
};