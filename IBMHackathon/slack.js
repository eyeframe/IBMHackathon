const request = require('request');

const channelUri = 'https://hooks.slack.com/services/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';

module.exports = {
    sendMessage: function(message) {
            let postData = {
                'text': message
            };
            var clientServerOptions = {
                uri: channelUri,
                body: JSON.stringify(postData),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
           
            request(clientServerOptions, function (error, response) {
                console.log(error,response.body);
                return;
            });
    }
}