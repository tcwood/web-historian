var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');


exports.handleRequest = function (req, res) {
  if (req.method === 'GET' || req.method === 'OPTIONS') {
    archive.isUrlArchived(req.url, function(exists) {
      if (exists) {
        var index;
        if (req.url === '/' || req.url === '/index.html') {
          index = archive.paths.siteAssets + '/' + 'index.html';
        } else {
          index = archive.paths.archivedSites + '/' + req.url;
        }
        //Read the contents of index.html
        fs.readFile(index, (err, data) => {
          res.writeHead(200, httpHelpers.headers);
          res.end(data);
        });
      } else {
        res.writeHead(404, httpHelpers.headers);
        res.end();
      }
    });
  } else if (req.method === 'POST') {
    var urlBuffer = '';
    
    req.on('data', function(data) {
      urlBuffer += data;
    });

    req.on('end', function() {
      var url = urlBuffer.slice(4);
      fs.appendFile(archive.paths.list, url + '\n', function (err) {
        if (!err) {
          res.writeHead(302, httpHelpers.headers);
          res.end();
        }     
      });

    });
  }
};


