var request = require('request');
var token = require('./secrets.js');
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token.GITHUB_TOKEN}`
    }
  };
  request(options, function(err, response, body) {
    console.log(response.statusCode)
    cb(err, body);
  })
      // streaming method
       //  .on('error', function (err) {
       //   throw err;
       //  })
       //  .on('response', function (response) {
       //    response.on('data', function(data){
       //      console.log(data.toString())
       //    })
       // })


}
getRepoContributors("jquery", "jquery", function(err, body) {
      if (err) {
      console.log('error: ', err);
      return;
    }
    else {
      var data = JSON.parse(body);
      data.forEach(function (data) {
        console.log(data.avatar_url)
      })
    }
});

