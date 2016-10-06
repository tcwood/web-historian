var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //Get the html of the index.html into a variable
  console.log(req.url);


  if (req.method === 'GET' || req.method === 'OPTIONS') {
    //Check if req url == /
    var index;

    archive.isUrlInList('www.google.com', function(exists) { console.log('good:', exists); } ); //FINALLLLYYYY RETURNS TRUE!!! FREEEEEDDDOOOOOOMMMMM
    archive.isUrlInList('www.gosd', function(exists) { console.log('baaaaad', exists); } );
    
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