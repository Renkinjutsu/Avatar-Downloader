var request = require('request');
var fs = require('fs');
var token = require('./secrets.js');
var args = process.argv.slice(2);
// args must have a value and have two arguments
if (!args[0] || args.length !== 2) {
  return;
} else {
// get arguments and callback function
  function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
         // calls to token import
        'Authorization': `token ${token.GITHUB_TOKEN}`
      }
    };
    request(options, function(err, response, body) {
      console.log(response.statusCode);
          // callback function getRepoContributors function call
      cb(err, body);
    })
  }
  // call function and loops through data
  getRepoContributors(args[0], args[1], function(err, body) {
    if (err) {
    console.log('error: ', err);
    return;
    }
    else {
      var data = JSON.parse(body);
      // loops through data
      data.forEach(function (data) {
        // call back for downloading images
        downloadImageByURL(`${data.avatar_url}`, `avatars/${[data.login]}.jpg`);
      })
    }
  });

  function downloadImageByURL(url, filePath) {
    request.get(url)
            .on('error', function(error) {
              console.log('Error: ', error);
            })
            .on('response', function(response) {
              console.log
                  (
                  'Downloading image...', '\n',
                  'Response Status Message: ', response.statusMessage, '\n',
                  'Content Type: ', response.headers['content-type']
                  );
            })
            // direct images to file directory
            .pipe(fs.createWriteStream(`${filePath}`));
  }
}


