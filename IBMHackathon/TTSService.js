
var request = require('request'),
    xmlbuilder = require('xmlbuilder'),
    wav = require('wav'),
    Speaker = require('speaker');
const stream = require('stream');
const fs = require('fs');
const toWav = require('audiobuffer-to-wav');
const AudioContext = require('web-audio-api').AudioContext;
const audioContext = new AudioContext;


exports.Synthesize = function Synthesize(Message){
    var apiKey = "4559ca77a5e34ed7b3e0a5766af67839";
    var ssml_doc = xmlbuilder.create('speak')
        .att('version', '1.0')
        .att('xml:lang', 'en-us')
        .ele('voice')
        .att('xml:lang', 'en-us')
        .att('xml:gender', 'Male')
        .att('name', 'Microsoft Server Speech Text to Speech Voice (en-US, Guy24KRUS)')
        .txt(Message)
        .end();
    var post_speak_data = ssml_doc.toString();

    request.post({
        url: 'https://westus.api.cognitive.microsoft.com/sts/v1.0/issuetoken',
        headers: {
            'Ocp-Apim-Subscription-Key' : apiKey
        }
    }, function (err, resp, access_token) {
        if (err || resp.statusCode != 200) {
            console.log(err, resp.body);
            // console.log("test");
        } else {
            try {
                console.log("Got token");
                // console.log(access_token);
                request.post({
                    url: 'https://westus.tts.speech.microsoft.com/cognitiveservices/v1',
                    body: post_speak_data,
                    headers: {
                        'content-type' : 'application/ssml+xml',
                        'X-Microsoft-OutputFormat' : 'riff-24khz-16bit-mono-pcm',
                        'Authorization': 'Bearer ' + access_token,
                        'X-Search-AppId': '07D3234E49CE426DAA29772419F436CA',
                        'X-Search-ClientID': '1ECFAE91408841A480F00935DC390960',
                        'User-Agent': 'TTSNodeJS'
                    },
                    encoding: null

                }, function (err, resp, speak_data) {
                    if (err || resp.statusCode != 200) {
                        console.log(err, resp.body);

                    } else {
                        try {
                            console.log(resp.statusCode);
                            console.log(resp.statusMessage);
                            var reader = new wav.Reader();
                            reader.on('format', function (format) {
                                // console.log("Made it till here")
                                reader.pipe(new Speaker(format));
                            });

                            audioContext.decodeAudioData(speak_data, buffer =>{
                                console.log(speak_data);
                                fs.appendFile('message.wav', new Buffer(speak_data), function (err){

                                });
                            });
                            // var Readable = require('stream').Readable;
                            // var s = new Readable;
                            // var writer = new wav.Writer();
                            // writer.pipe(require('fs').createWriteStream('output.mp3'));
                            // s.push(speak_data);
                            // // console.log(speak_data);
                            // s.push(null);
                            // s.pipe(reader);
                            // writer.write(speak_data);
                            // write(speak_data, ()=>{
                            //     console.log("done");
                            // });
                        } catch (e) {
                            console.log(e.message);
                        }
                    }
                });
            } catch (e) {
                console.log(e.message);
            }
        }
    });
};
