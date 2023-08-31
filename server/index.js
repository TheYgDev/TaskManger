const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const io = require('socket.io');
const mongoose = require('mongoose');
const common = require("./common");
const Task = require("./models/task");


const DBurl = "mongodb://127.0.0.1:27017/TaskManger";

const app = express();
const httpServer = http.createServer(app);

// add cors to socketIO
const ioServer = io(httpServer, {
    cors: {
        origin: '*'
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// add cors for rest
app.use(cors());


// apis 
const userRoute = require('./routes/userRoute');
app.use('/users', userRoute);
const taskRoute = require('./routes/taskRoute');
app.use('/tasks', taskRoute);


ioServer.on('connection', async (socket) => {
    const token = socket.handshake.query.token;
    if (!token) {
        socket.disconnect();
        return;
    }

    try {
        const payload = common.jwt.verify(token, common.secret);
        console.log('User connected');

        socket.on('gettasks', async () => {
            let tasks = await Task.find()
            socket.emit('getTasks', tasks);
        });

        socket.on('gettask', async (id) => {
            try { 
                let task = await Task.findOne({
                    _id:id
                })
                socket.emit('getTask', task);
            }
            catch (err) {
                socket.emit("getTask", new Task());
            }
        });

        socket.on('deletetask', async (id) => {
            try {
                let deletedTask = await Task.findOneAndDelete({
                    _id: id
                });
                ioServer.emit('deleteTask',deletedTask,"Task Deleted");
            }
            catch (err) {
                console.log("delete ded");
                socket.emit('deleteTask',null,"error Acored While deleteing");
            }
        });
        socket.on('updatetask', async (task) => {
            try {
            const newtask = await Task.findOne({
                _id: task._id
            })
            if (newtask) { 
                newtask.title = task.title;
                newtask.description = task.description;
                newtask.isDone = task.isDone;
                newtask.priority=task.priority;
            }
            
                await newtask.save();
                ioServer.emit('updateTask', newtask);
            }
            catch (err) { 
                socket.emit('updateTask', { title: "couldnt save" });
                console.log("error at updateing",err.message);
            }
        });

        socket.on('addtask', async (task) => {
            try {
            const newTask = new Task({
                title: task.title,
                description: task.description,
                isDone: task.isDone,
                priority:task.priority
            });
            
                await newTask.save();
                ioServer.emit('addTask', newTask);
            }
            catch(err) {
                console.log("error at adding",err.message);
            }
        });

        socket.on('disconnect', async() => {
            console.log('User disconnected:', payload.username);
        });


    } catch (err) {
        console.error('Token verification failed:', err.message);
        socket.disconnect();
    }
})


mongoose.connect(DBurl).then(()=>{

    console.log("DB is connected")

    const server = httpServer.listen(8080, function(){

        const port = server.address().port;
        console.log("App is running on port", port);
    
    })
})
.catch(error=>console.log(error))

