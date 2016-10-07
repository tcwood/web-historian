var archive = require('../helpers/archive-helpers');
//Check to see what needs to be downloaded
  //Go through sites.txt and check if site is archived
exports.fetch = function() {
  archive.readListOfUrls(array => {
    archive.downloadUrls(array);
  });
};
  //Readlistofurls to get array of urls in list
    //For each item, do isUrlArchived
      //If it is not
        //downloadOneUrl on this url
