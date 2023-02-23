const { createReadStream } = require('fs');
const { WebClient } = require('@slack/web-api');
const token = 'odm7r5n0rVUQEBnGWnzAbYJb';
const channelId = 'C03HAETD2P2';
const web = new WebClient(token);
var fs = require('fs');
var path = require('path');
var dirPath = path.resolve('public');
var filesList;
/*fs.readdir(dirPath, function (err, files) {
  filesList = files.filter(function (e) {
    return path.extname(e).toLowerCase() === '.png';
  });
  for (const type of filesList) {
    console.log(`${type}`);
    const uploadFileToSlack = async () => {
      await web.files.upload({
        filename: 'Failed Tests',
        file: createReadStream(`public/${type}`),
        channels: channelId,
      });
    };
    uploadFileToSlack();
  }
});*/

//https://hooks.slack.com/services/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
