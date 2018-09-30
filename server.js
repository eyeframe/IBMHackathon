const express = require('express');
const ejs = require("ejs");
const bodyParser = require('body-parser');
const path = require('path');
let port = process.env.PORT || 8081;
const cmd = require('node-cmd');
const pytalk = require('pytalk');
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const fs = require('fs');
const mailer = require('./mailer.js');
const firebase = require('./firebase.js');
const slack = require('./slack.js');
var tts = require('./TTSService.js');
const prompt = require('prompt');

var mapApiKey = 'AIzaSyBJRJBcFIiO_TJGqHT323HSavkP0oqOq7Y';

prompt.start();

var textToSpeech = new TextToSpeechV1({
  username: '35ecbd89-f53e-4a22-8148-1c17da181375',
  password: 'RCgvfhWPoLzR',
  url: 'https://stream.watsonplatform.net/text-to-speech/api/'
});


const app = express();
const weatherApiUrl = 'https://weather.api.here.com/weather/1.0/report.json?app_id=iJrAATYzuKrylgF1Jh79&app_code=DW_yrqBAgzO_demWfq2oSw&product=nws_alerts&name=Washington,Seattle';
const safeLocationHead = 'NO WARNINGS DETECTED IN SEATTLE. SHOWING A SAMPLE WARNING OF TEXAS INSTEAD...';
const safeLocationMessage = 'The Flood Warning continues for the following areas in Texas.  East Fork Trinity River At McKinney Affecting Collin County Trinity River At Dallas Affecting Dallas County Trinity River Near Rosser Affecting Ellis and Kaufman Counties Trinity River At Trinidad Affecting Henderson and Navarro Counties The Flood Warning continues for The Trinity River Near Rosser. * At 0730 AM Monday the stage was 32.88 feet. * Flood stage is  31 feet. * Minor flooding is occurring and it is expected to continue. * Forecast. The river will continue rising to a crest near 34 feet by Monday evening. The river should fall below flood stage Tuesday afternoon. * At 34 feet, Minor to moderate flooding of low areas and roads within the levees is expected.'
const messageEnd = '\nInformation related to disaster preparedness can be found in https://www.ready.gov/'
const textToSpeechURL = "https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize";
let lastMessage = '';
let messageList = [];
let emailList = ["bahushruth.bahushruth@gmail.com"];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'static')))
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);



app.get('/control', (req, res) => {
  res.render('index2');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/getApiKey', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({key : mapApiKey}));
});

app.post('/python', (req, res) => {
        let images = req.body;
        if(images.length > 1){
            images = `./static/images/${images[0]}.jpg ./static/images/${images[1]}.jpg`;
            cmd.get(`python3 ./static/python/structure_change.py ${images}`, function (err, data, stderr) {
                if (stderr) console.log(stderr);
                if (err) console.log(err);
                let temp = data.split('\n');
                console.log(temp);

                res.json({'data':temp});
            }
        );
        }else{
            images = `./static/images/${images[0]}.jpg`;
            cmd.get(`python3 ./static/python/Vi.py ${images}`, function (err, data, stderr) {
                if (stderr) console.log(stderr);
                if (err) console.log(err);
                let temp = data.split('\n');
                console.log(temp);

                res.json({'data':temp});
            }
        );
        }    
});

app.get('/chat', (req, res) => {
  res.render('chat');
});

app.get('/message', (req, res) => {
    let command = `curl -X GET "${weatherApiUrl}"`;

    cmd.get(command, function(err, data, stderr) {
        if(stderr) console.log(stderr);
        if(err) console.log(err);
        // console.log(data);
        let temp = data.split('\n');
        let t = [];
        for(let x in temp) {
            if(temp[x] !=''){
                t.push(temp[x]);
            }
        }

        messageList = [];
        // console.log(t);
        let jsonData = JSON.parse(t[0]);
        if(jsonData.hasOwnProperty('nwsAlerts')) {
            let warning = jsonData.nwsAlerts.warning;
            for(var i in warning) {
                let m = warning[i].message;
                m = m.substring(0, m.length - 3);
                messageList.push(m);
            }
        }

        let result;
        if(messageList.length==0) result = [safeLocationHead, safeLocationMessage];
        else result = messageList;
        res.json({'data':result});
    });
});

app.get('/getWeatherForecast', (req, res) => {
    let command = 'curl -X GET "https://api.weather.com/v3/wx/forecast/daily/3day?geocode=47.609862%2C-122.328964&units=s&language=en-US&format=json&apiKey=5424e9662cbf4bc3a4e9662cbf4bc3fe" -H "accept: application/json; charset=UTF-8"';
    cmd.get(command, function(err, data, stderr) {
        if(stderr) console.log(stderr);
        if(err) console.log(err);

        console.log("Did that");
        // console.dir(data);
        // fs.writeFileSync("Weatherdata.json", data);
          res.json(JSON.parse(data));

    });
});

app.get('/getCurrentWeather', (req, res) => {
    let command = 'curl -X GET "https://api.weather.com/v3/wx/observations/current?geocode=47.609862%2C-122.328964&units=s&language=en-US&format=json&apiKey=da328055e2e940d8b28055e2e9e0d851" -H "accept: application/json; charset=UTF-8"';
    cmd.get(command, function(err, data, stderr) {
        if(stderr) console.log(stderr);
        if(err) console.log(err);

        // console.log(data);
        console.log("Did this")
        // fs.writeFileSync("Currentweatherdata.json", data);
        res.json(JSON.parse(data));
    });
});

app.post('/python/sms', (req, res) => {
    cmd.get(`python3 ./static/python/sms.py`, function (err, data, stderr) {
        if (stderr) console.log(stderr);
        if (err) console.log(err);
        console.log(data);
        res.send('Sending Complete');
    });
});

app.post('/python/email', (req, res) => {
    if(emailList.length > 1) emailList.pop();
    emailList.push(req.body.email);

    let emailArgs = emailList.join(', ');
    let messageArgs = messageList.length==0 ? safeLocationMessage : messageList[0];

    console.log("EMAIL TRIGGERED");

    if((messageList.length == 0) || (messageArgs == lastMessage)) {
        messageArgs = safeLocationMessage; 
    
        //Send previous audio file | Python script
        messageArgs = messageArgs + messageEnd;
        mailer.send(emailArgs, 'URGENT SITUATION', messageArgs);
    }
    else {
        messageArgs = messageList[0];
        lastMessage = messageArgs;
        generateSpeech(messageArgs, function(){
            // Send new audio file | python script
            mailer.send(emailArgs, 'URGENT SITUATION', messageArgs);
        });
        // TESTING ONLY:
        // messageArgs = messageArgs + messageEnd;
        // mailer.send(emailArgs, 'URGENT SITUATION', messageArgs);
    }
});


app.get('/send_inventory', function(req, res){
  var request = req.query;
  console.log(request);
  var user_id = request.user_id;
  
  firebase.getInventory(user_id, function(data){
    data = beautifyData(data);
    if ( data == 'null' ) data = '`INVENTORY is empty.`';
    res.send( '' );
   
    var msg = `INVENTORY: ${request.user_name}\n` + data ;
    slack.sendMessage( msg );
  });
});

app.get('/alert', function(req, res) {
  console.log('TRIGGERED');
  firebase.getGlobalInventory(function(data){
     let result = {};
     console.log('REIEVED');
     if(data['Condition'] == 'CRITICAL') result = data;
     console.log(result);
     res.json(result);
  });
});

app.get('/view_inventory', function(req, res){
  var request = req.query;
  var user_id = request.user_id;

  firebase.getInventory(user_id, function(data){
    data = beautifyData(data);
    if ( data == 'null' ) data = '`INVENTORY is empty.`';
    res.send( data );
  });
});

app.get('/get_userid', function(req, res){
  var request = req.query;
  res.send( 'Your Slack UserID is ' + request.user_id );
});

app.get('/get_global_inventory', function(req, res) {
  firebase.getGlobalInventory(function(data){
    data = beautifyData(data);
    slack.sendMessage(data);
  });
});
app.post('/fetch_inventory', function(req, res){
  var request = req.body;
  var user_id = request.user_id;
  
  // console.log('>'+user_id);

  firebase.getInventory(user_id, function(data){
    // console.log(data);
    res.json( data );
  });
});

app.post('/update_inventory', function(req, res){
  var request = req.body;
  console.log(request);
  firebase.overrideInventory(request, function() {
    res.send('Inventory Updated Successfully!');
  });
});

app.post('/slackUpdateInventory', function(req, res) {
  var request = req.body;
  parseArguements(request.text).then(arg=>{
    var updateRequest = {};
    updateRequest['user_id'] = request.user_id;
    updateRequest['items'] = arg;
  
    firebase.updateInventory(updateRequest, function() {
      firebase.getInventory(updateRequest['user_id'], function(data){
        data = beautifyData(data);
        res.send(data);
      });
    });
  });
  
});

app.get('/getApiKey', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        key: 'AIzaSyB0Vcu8VZBdX2sd2tHdU52IVTQwNOq_B-A'
    }));
});

app.get('*', (req, res) => {
    res.send('404 Error');
});

prompt.get(['mapApiKey'], function (err, result) {
    //
    // Log the results.
    //
    console.log('Command-line input received:');
    console.log('  mapApiKey: ' + result.mapApiKey);
    mapApiKey = result.apikey;

    app.listen(port, () => {
        console.log(`http://localhost:${8081}`);
    });
  });




async function parseArguements(arg) {
  var arr = arg.split(", ");
  var n = arr.length;
  var ob = {},
      item, key, value;
  for(var i=0;i<n;i++) {
    item = arr[i].split(':');
    key = item[0].trim();
    value = item[1].trim();
    ob[key] = value;
  }
  
  return await ob;
  
}

function beautifyData(data) {
  if(data == 'undefined') return 'null';
  data = JSON.stringify(data);
  data = data.replace(/,/g, "\n");
  data = data.replace(/[{"}]/g, "");
  data = data.replace(/:/g, ": ");
  return data;
}

async function generateSpeech(message, callback) {
    await tts.Synthesize(message);
    callback();
}