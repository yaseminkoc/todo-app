import { useState } from 'react'
import { nanoid } from '@reduxjs/toolkit';
import { addTodo } from '../redux/todos/todosSlice'
import { useDispatch } from "react-redux"
function Form() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title) return;
    dispatch(addTodo({ title}));
    setTitle("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input className="new-todo" placeholder="What needs to be done?" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} />
    </form>
  )
}

export default Form