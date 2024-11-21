import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { addTodo, deleteTodo, toggleTodo } from '../REDUX/todoSlice';

function Home() {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todoReducer)
    const completedTodos = todos.filter(todo => todo.completed).length

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim() === '') {
            return toast.warn('Please enter a todo')
        } else {
            dispatch(
                addTodo({
                    id: Date.now(),
                    text,
                    completed: false
                })
            )
            setText('')
            toast.success('Todo added successfully')
        }
    }
    const handleDelete = (id) => {
        dispatch(deleteTodo(id))
        toast.error('Todo deleted')
    }

    const handleStatusUpdate = (id) => {
        dispatch(toggleTodo(id))
        toast.info('Todo status updated')
    }

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className='fw-bold text-center text-success mb-4'>ToDo App</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="todoText">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter ToDo"
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                />
                            </Form.Group>
                            <div className='d-flex justify-content-center align-items-center'>
                                <Button variant="outline-info" type="submit">
                                    <i className="fa-solid fa-circle-plus pe-2"></i>
                                    Add ToDo
                                </Button>
                            </div>
                        </Form>
                        <hr />
                        <h2 className='text-center text-success-emphasis fw-semibold my-3'>All Todos</h2>
                        {todos?.length === 0 ?
                            (<h4 className='text-info fw-semibold'>No todos yet. Start adding some!!!</h4>)
                            :
                            (<>
                                <h5>Total Todos: {todos.length}</h5>
                                <h5>Completed Todos: {completedTodos}</h5>
                                <ul style={{ listStyleType: 'none' }} className='mt-4'>
                                    {todos?.map(todo => (
                                        <li key={todo.id} className='table shadow w-50 border rounded-1 row row-cols-lg-auto justify-content-between align-items-center p-2'>
                                            <Form.Check
                                                type="checkbox"
                                                label={todo.text}
                                                checked={todo.completed}
                                                onChange={() => handleStatusUpdate(todo.id)}
                                            />
                                            <Button
                                                variant="link"
                                                className="ml-2"
                                                onClick={() => handleDelete(todo.id)}
                                            >
                                                <i className="fa-solid fa-trash text-danger"></i>
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </>)
                        }
                    </Col>
                </Row>
                <ToastContainer position='top-right' theme='colored' autoClose={3000} />
            </Container >
        </>
    )
}
export default Home