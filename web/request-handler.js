var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');


exports.handleRequest = function (req, res) {
  if (req.method === 'GET' || req.method === 'OPTIONS') {
    console.log('getgetgetrequest', req.url);
    archive.isUrlArchived(req.url, function(exists) {
      if (exists) {
        var index;
        if (req.url === '/' || req.url === '/index.html') {
          index = archive.paths.siteAssets + '/index.html';
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
    //check if we have file
      //if we do,
        // write to headers 302 and object (that has key Location, value = full URL want to be directed to)
      //if we don't
        //give loading html

    var urlBuffer = '';
    
    req.on('data', function(data) {
      urlBuffer += data;
    });

    req.on('end', function() {
      var url = urlBuffer.slice(4);

      if (url === '') {
        httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html', function(data) {
          res.writeHead(200, httpHelpers.headers);
          res.end(data);
        });
      }

      archive.isUrlArchived(url, function(exists) {
        if (exists) {
          res.writeHead(302, {Location: 'http://127.0.0.1:8080/' + url});
          res.end();
        } else {
          fs.appendFile(archive.paths.list, url + '\n', function (err) {
            if (!err) {
              console.log('POSTPOTSPPOST', url);
              res.writeHead(201, {Location: 'http://127.0.0.1:8080/loading.html'});
              res.end();
            }
          });
        }
      });
    });
  }
};


