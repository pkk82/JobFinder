var expect = require('chai').expect;
var mongoose = require('mongoose');
var jobModel = require('../../models/Job');
var Promise = require('bluebird');
var jobsData = require('../../jobs-data.js');


function resetJobs() {
    return new Promise(function(resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}




describe('get jobs', function() {

    var jobList;

    before(function(done) {
        jobsData.connectDB('mongodb://jobfinder:jobfinder@ds061747.mongolab.com:61747/jobfinder')
            .then(resetJobs)
            .then(jobsData.seedJobs)
            .then(jobsData.findJobs)
            .then(function(collection) {
                jobList = collection;
                done();
            });
    });

    after(function() {
        mongoose.connection.close();
    });

    it('should never be empty since jobs are seeded', function() {
        expect(jobList.length).to.be.at.least(1);
    });

    it('should have a job with a title', function() {
        expect(jobList[0].title);
    });

    it('should have a job with a description', function() {
        expect(jobList[0].description);
    });
});

describe("db save jobs", function() {
    var job = {
        title: 'Cook',
        description: 'You will be making bagels'
    };
    var jobs;

    function saveTestJob() {
        return jobsData.saveJob(job);
    }

    before(function(done) {
        jobsData.connectDB('mongodb://jobfinder:jobfinder@ds061747.mongolab.com:61747/jobfinder')
            .then(resetJobs)
            .then(function() {
                return jobsData.saveJob(job);
            })
            .then(jobsData.findJobs)
            .then(function setJobs(collection) {
                jobs = collection;
                done();
            });
    });

    after(function() {
        mongoose.connection.close();
    });

    it("should have one job after saving one job", function() {
        expect(jobs).to.have.length(1);
    })
});
