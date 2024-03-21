import React, { useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { addTodo } from '../REDUX/todoSlice';
import Todo from '../Components/Todo';

function Home() {
    const [todos, setTodos] = useState({
        id: JSON.stringify(Date.now()), todo: "", status: ""
    })

    const dispatch = useDispatch()

    const handleAddTodo = () => {
        if (todos.todo == "") {
            toast.error('Please Enter a ToDo!!!')
        } else {
            dispatch(addTodo(todos))
            setTodos({
                id: JSON.stringify(Date.now()), todo: "", status: ""
            })
            toast.success('ToDo added successfully!!!')
        }
    }
    return (
        <>
            <div style={{ marginTop: '50px' }} className='container bg-info-subtle'>
                <h1 className='text-center fw-bold text-success'>ToDo List</h1>
                <div className="d-flex justify-content-start align-items-start">
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Add your Todos"
                        className="mb-3 me-2"
                    >
                        <Form.Control as="textarea" 
                        placeholder="Add your Todos" 
                        value={todos.todo} 
                        onChange={e=>setTodos({...todos,todo:e.target.value})} />
                    </FloatingLabel>
                    <Button onClick={handleAddTodo} variant="outline-info my-3"><i className="fa-solid fa-circle-plus pe-2"></i>ADD</Button>
                </div>
                <Todo/>
            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </>
    )
}

export default Home