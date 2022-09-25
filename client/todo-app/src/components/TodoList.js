import { useEffect } from 'react'
import { useSelector } from "react-redux"
import { selectFilteredTodos} from '../redux/todos/todosSlice'
import { getTodoAsync, toggleTodoAsync, deleteTodoAsync} from '../redux/todos/services'
import { useDispatch } from "react-redux"
import Loading from './Loading'
import Error from "./Error"
function TodoList() {
    const dispatch = useDispatch();
    const filteredTodos = useSelector(selectFilteredTodos);
    const isLoading = useSelector((state) => state.todos.addNewTodo.isLoading);
    const error = useSelector((state) => state.todos.addNewTodo.error);
    const handleDestroy = async (id) => {
        if (window.confirm("Are you sure?")) {
            await dispatch(deleteTodoAsync(id));
        }
    }

    const handleToggle = async (id, completed) => {
       await dispatch(toggleTodoAsync({id, data:{completed}}))
    }

    useEffect(() => {
        dispatch(getTodoAsync())
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <Error message={error}/>
    }
   
    return (
        <ul className="todo-list">
            {
                filteredTodos.map((item) => (
                    <li key={item.id} className={item.completed ? "completed" : ""}>
                        <div className="view">
                            <input className="toggle" type="checkbox" checked={item.completed} onChange={() => handleToggle(item.id, !item.completed )} />
                            <label>{item.title}</label>
                            <button className="destroy" onClick={() => handleDestroy(item.id)}></button>
                        </div>
                    </li>
                ))}
        </ul>
    )
}

export default TodoList