import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { onAuthStateChanged} from 'firebase/auth'
import { set, ref, onValue, remove, update } from 'firebase/database'
import { auth, db } from '../firebase'
import { uid } from 'uid'
import Navbar from './Navbar'
import './todoPage.css'


function TodoPage() {
    const [todoInput, setTodoInput] = useState('');
    const [todos, setTodos] = useState([]);
    const [tempUidd, setTempUidd] = useState('');
    const [isEditing, setIsEditing] = useState(false) ;
    const navigate = useNavigate()

    const uploadToDb = ()=>{
        const uidd = uid();
        set(ref(db, `${auth.currentUser.uid}/${uidd}`),{
            todo:todoInput,
            uidd
        })
        setTodoInput('')
    }

    const handleDelete = (id)=>{
        remove(ref(db,`/${auth.currentUser.uid}/${id}`))
    }
    const handleEditConfirm = ()=>{
        update(ref(db,`/${auth.currentUser.uid}/${tempUidd}`),{
            todo:todoInput,
            tempUidd
        })
    }

    const handleEdit = (todo)=>{
        setIsEditing(true)
        setTodoInput(todo.todo)
        setTempUidd(todo.uidd)
    }

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
              if(user){
                onValue(ref(db,`/${auth.currentUser.uid}`),snapshot=>{
                    setTodos([]);
                    const data = snapshot.val();
                    if(data !== null){
                        Object.values(data).map(todo=>setTodos(prev=>[...prev, todo]))
                    }
                })
            } else if(!user){
                navigate('/login')
            }
        })
    },[])
  return (
    <div className='todoPage'>
        <Navbar/>
        <div className="todo_head"><span>Todo App</span></div>
        <div className="todo_card">
            <input type="text" value={todoInput} onChange={(e)=>setTodoInput(e.target.value)} placeholder='Type Here' />
            { !isEditing ? <button onClick={uploadToDb}>Add Todo</button>:<button onClick={handleEditConfirm}>Edit</button>}
            <div className="todo_list">
                <h1>Your Todos</h1>
                {
                    todos && todos.map(todo=>{
                       return <div key={todo.uidd} className='todo_item'>
                        <div className='todo_content'><p>{todo.todo}</p></div>
                        <div className="todo_btns">
                        <button onClick={()=>handleEdit(todo)}>Edit</button>
                        <button onClick={()=>handleDelete(todo.uidd)}>Delete</button>
                        </div>
                       </div> 
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default TodoPage
