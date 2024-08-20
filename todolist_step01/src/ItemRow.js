import { useState } from "react";
import axios from "axios";
const serverURL = 'http://localhost:5000/todo';

const ItemRow = ({setTodoList, item})=>{
    const [flag, setFlag] = useState(false);
    const [outputTitle, setOutputTitle] = useState(item.title);
    const lineThroughClass = {textDecoration:"line-through", color:"blue"}
    const [titleTmp, setTitleTmp] = useState(item.title);

    const onDelete = (todoItem) => {
        axios.delete(serverURL, {data : todoItem}).then(function(response) {
            console.log(todoItem);
            setTodoList(response['data']);
        });
    };

    const onDoneFlag = (todoItem)=>{
        todoItem.done = !todoItem.done;
        axios.put(serverURL, todoItem).then(function(response) {
            setTodoList(response['data']);
        });
    };

    const onEdit = (todoItem)=>{
        axios.put(serverURL, todoItem).then(function(response) {
            setTodoList(response['data']);
        });
    };

    return(<div className="input-group mb-3">
        <div className="input-group-prepend">
          <div className="input-group-text">
          <input onChange={()=>{
              onDoneFlag(item);
          }} checked={item.done && "checked"} type="checkbox" />
          </div>
        </div>
          <input 
              style={ item.done ? lineThroughClass:{}}
              type="text" className="form-control" 
              readOnly={!flag && "readOnly"}
              value={outputTitle}
              onChange={(e)=>{
                  setOutputTitle(e.target.value);
                  setTitleTmp(e.target.value);
              }}
              onFocus={(e)=>{
                  setFlag(true);
              }}
              onBlur={(e)=>{
                setFlag(false);
                // 수정 하다가 말았기 때문에 원복한다.
                setOutputTitle(item.title);
              }}
              />
          <div className="input-group-append">
              <button onClick={()=>{
                // edit 버튼을 클릭하면 blur가 먼저 호출...
                console.log("edit ...:", titleTmp);
                setOutputTitle(titleTmp);
                onEdit({no:item.no, title:titleTmp, done:item.done});
              }} className="btn btn-primary" type="button">Edit</button>  
              <button onClick={()=>{
                  onDelete(item);
              }} className="btn btn-danger" 
              type="button">Delete</button>  
        </div>
      </div>);
}

export default ItemRow;