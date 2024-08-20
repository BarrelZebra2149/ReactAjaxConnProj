import ItemRow from "./ItemRow";

const Output = ({todoList, setTodoList}) => {
    return (
        <div className="list-body">
            <div className="container">
                <table className="table table-hover">
                    <thead>
                    <tr style={{textAlign:"center"}}>
                        <th>Done</th>
                        <th>Title</th>
                        <th>Buttons</th>
                    </tr>
                    </thead>
                    <tbody>
                    {todoList.map((item)=> {
                        return(<tr key={item.no}>
                            <td colSpan={3} style={{padding:"0px"}}>
                                <ItemRow todoList={todoList} setTodoList={setTodoList} item={item} />
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
                <ul>
                </ul>
            </div>
        </div>
    )
}

export default Output;