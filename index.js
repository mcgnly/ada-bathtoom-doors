const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 8080;

let bathrooms = {
    "fifthFloorLeft": true,
    "fifthFloorRight": false,
    "fourthFloorEngineering": false,
    "fourthFloorProduct": false,
    "thirdFloor": false,
    "groundFloorLeft": false,
    "groundFloorRight": false,
}


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
// app.use(bodyParser.text({ type: 'text/html' }))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Accept", "*");
//     // res.header("Content-Type", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get('/', (req, res) => {
    console.log('hello from the server, responding to a get!');
    res.json(bathrooms);
});


app.post('/', function (req, res) {
    console.log('posting to the endpoint!');
    // example input from photon webhook
    // echo: {"event":"fourthFloorEngineering","data":"test-event","published_at":"2018-09-22T16:51:54.861Z","coreid":"api"}
    const roomToChange = req.body.event;
    const roomStatus = req.body.data;
    fakeStatus = (roomStatus === "test-event")
    bathrooms[roomToChange] = fakeStatus;
    console.log('echo: '+ JSON.stringify(req.body));
    res.send('echo: '+ JSON.stringify(req.body));
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))