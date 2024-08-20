const http = require('http');
const express = require('express');
const serverApp = express();
const cors = require('cors');
const bodyParser = require('body-parser');

serverApp.set('port', 5000);

// static middle ware
serverApp.use('/', express.static("public"));

// this allows other clients to access
serverApp.use(cors());
serverApp.use(bodyParser.urlencoded({ extended: false }));
serverApp.use(bodyParser.json());

// data array
const todoList = [
    {no:101, title:"do study", done: false},
    {no:102, title:"do java task", done: true},
    {no:103, title:"do react task", done: false},
    {no:104, title:"do spring task", done: false}
];
let noCnt = 105;

//get todoList
serverApp.get("/todo", (req, res)=>{
    res.send(todoList);
});

//modify todoList
serverApp.post('/todo', (req, res) => {
    var title = req.body.title;
    todoList.push({no:noCnt++, title, done:false});
    res.send(todoList);
});
serverApp.put('/todo', (req, res) => {
    let curNo = parseInt(req.body.no);
    const idx = todoList.findIndex((item) => {
        return item.no === curNo;
    })
    if(idx !== -1) {
        todoList[idx] = req.body;
    }
    res.send(todoList);
});
serverApp.delete('/todo', (req, res) => {
    //console.log(req.body);
    let curNo = parseInt(req.body.no);
    const idx = todoList.findIndex((item) => {
        return item.no === curNo;
    })
    if(idx !== -1) {
        todoList.splice(idx, 1);
    }
    res.send(todoList);
});

// check if server is working
const server = http.createServer(serverApp);
server.listen(serverApp.get('port'), ()=>{
    console.log("server is working >>> http://localhost:"+serverApp.get('port'));
});