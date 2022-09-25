import { useState } from 'react'
import { addTodoAsync } from '../redux/todos/services'
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading"
import Error from "./Error"
function Form() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos.addNewTodo.isLoading);
  const error = useSelector((state) => state.todos.addNewTodo.error);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title) return;
    await dispatch(addTodoAsync({ title}));
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} style={{display:"flex", alignItems:'center'}}>
      <input disabled={isLoading} className="new-todo" placeholder="What needs to be done?" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} />
      {
        isLoading && <Loading/>
      } 
      {
        error && <Error message={error}/>
      }
      
    </form>
  )
}

export default Form