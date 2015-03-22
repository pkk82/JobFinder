var express = require('express');
var jobModel = require('./models/Job');
var jobsData = require('./jobs-data.js');


var app = express();

require('./jobs-service.js')(jobsData, app);


app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
    res.render('index');
});


//jobsData.connectDB('mongodb://localhost/jobfinder');
jobsData.connectDB('mongodb://jobfinder:jobfinder@ds061747.mongolab.com:61747/jobfinder')
    .then(function() {
        console.log('connected to mongodb successfully!');
        jobsData.seedJobs();
    });


app.listen(process.env.PORT, process.env.IP);
