const http = require('http');
const express = require('express');
const serverApp = express();
const cors = require('cors');
const bodyParser = require('body-parser');

serverApp.set('port', 5000);

// static 미들 웨어
serverApp.use('/', express.static("public"));
// URL 또는 포트가 다른 클라이언트 요청 허용
serverApp.use(cors());
serverApp.use(bodyParser.urlencoded({ extended: false }));
serverApp.use(bodyParser.json());

// 데이터 임시 저장 배열
const todoList = [{no:101, title:"공부하기(서버)", done: false},
    {no:102, title:"자바하기(서버)", done: true},
    {no:103, title:"리액트하기(서버)", done: false},
    {no:104, title:"스프링하기(서버)", done: false}];
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
    console.log(req.body);
    let curNo = parseInt(req.body.no);
    const idx = todoList.findIndex((item) => {
        return item.no === curNo;
    })
    if(idx !== -1) {
        todoList.splice(idx, 1);
    }
    res.send(todoList);
});

const server = http.createServer(serverApp);
server.listen(serverApp.get('port'), ()=>{
    console.log("server is working >>> http://localhost:"+serverApp.get('port'));
});