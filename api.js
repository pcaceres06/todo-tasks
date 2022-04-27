var TaskModel = require('./task_schema');
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var query = "mongodb+srv://pcaceres:1234@cluster0.xt4d6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db = (query);

mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(error){
    if(error){
        console.log(`Error! ${error}`);
    }else{
        console.log("Conexión exitosa a la base de datos");
    }
});

router.post('/create-task', function(req, res){
    let task_id = req.body.Taskid;
    let name = req.body.Name;
    let deadline = req.body.Deadline;

    let task = {
        Taskid: task_id,
        Name: name,
        Deadline: deadline
    }

    var newTask = new TaskModel(task);

    newTask.save(function(error, data){
        if(error){
            console.log(error);
            res.status(500).send("Internal Error \n");
        }else{
            res.status(200).send("Ok \n");
        }
    });
});

router.get('/all-tasks', function (req, res) {
    TaskModel.find(function (err, data) {
        if (err) {
            res.status(500).send("Internal error\n");
        }
        else {
            res.status(200).send(data);
        }
    });
});

router.post('/update-task', function (req, res) {
    TaskModel.updateOne({ TaskId: req.body.TaskId }, {
        Name: req.body.Name,
        Deadline: req.body.Deadline
    }, function (err, data) {
        if (err) {
            res.status(500).send("Internal error\n");
        } else {
            res.status(200).send("OK\n");
        }
    });
});

router.delete('/delete-task', function (req, res) {
    TaskModel.deleteOne({ TaskId: req.body.TaskId }, function (err, data) {
        if (err) {
            res.status(500).send("Internal error\n");
        } else {
            res.status(200).send("OK\n");
        }
    });
});

module.exports = router;