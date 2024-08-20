import { useRef, useState } from "react";
import axios from "axios";
const serverURL = 'http://localhost:5000/todo';
const Input = ({setTodoList}) => {
    const [inputTitle, setInputTitle] = useState("");

    // hook can't be included to callback functions.
    const inputFocus = useRef(null);

    const addList = ()=>{
        if(inputTitle === "" || inputTitle === null) {
            alert("no context");
            inputFocus.current.focus();
            return;
        }
        onClickEvent(inputTitle);
        setInputTitle("");
        inputFocus.current.focus();
    }

    const onClickEvent = (newTitle) => {
        //make new list adding the component to last
        axios.post(serverURL, {title:newTitle}).then(function(response) {
            setTodoList(response['data']);
        });
    }

    return (
        <div className="input-title">
            <div className="container" style={{padding: "10px"}}>
                <div className="input-group mb-3">
                    <input autoFocus ref={inputFocus}
                           value={inputTitle}
                           onChange={(e)=> setInputTitle(e.target.value)}
                           type="text" className="form-control"/>
                    <div className="input-group-append">
                        <button className="btn btn-success" onClick={addList}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// use only one component
export default Input;

// if you want to use two component, use like this.
// const InputSub = () => {
//     return (<>

//     </>);
// }
// export {Input, InputSub};
// import {Input, InputSub} from "./Input"