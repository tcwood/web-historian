var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //Get the html of the index.html into a variable
  if (req.method === 'GET' || req.method === 'OPTIONS') {



    var index = archive.paths.siteAssets + '/index.html';

    //Read the contents of index.html
    fs.readFile(index, (err, data) => {
      res.writeHead(200, httpHelpers.headers);
      res.end(data);
    });
    


  }
};
