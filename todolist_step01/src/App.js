import "./App.css";
import {useEffect, useState} from "react";
import Input from "./Input";
import Output from "./Output";
import axios from "axios";

const App = ()=>{
    const [name, setName] = useState("Todo List");
    const [todoList, setTodoList] = useState([]);
    const [noCnt, setNoCnt] = useState(105);

    useEffect(() => {
        axios.get('http://localhost:5000/todo').then(function (response) {
            setTodoList(response['data']);
        })
    }, []);

    return (<div className="todoList">
        <div className="App-header"><h1>{name} App</h1> </div>
        <Input todoList={todoList} setTodoList={setTodoList} noCnt={noCnt} setNoCnt={setNoCnt}/>
        <Output todoList={todoList} setTodoList={setTodoList}/>
    </div>);
}

export default App;

