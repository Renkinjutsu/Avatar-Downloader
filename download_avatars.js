var request = require('request');
var fs = require('fs');
var token = require('./secrets.js');
var args = process.argv.slice(2);
console.log(args[0], args[1]);

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
getRepoContributors(args[0], args[1], function(err, body) {
      if (err) {
      console.log('error: ', err);
      return;
    }
    else {
      var data = JSON.parse(body);
      data.forEach(function (data) {
        downloadImageByURL(`${data.avatar_url}`, `avatars/${[data.login]}.jpg`)
      })
    }

});

function downloadImageByURL(url, filePath) {
  console.log(url)
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
    .pipe(fs.createWriteStream(`${filePath}`))
}


