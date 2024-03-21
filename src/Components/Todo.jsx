import React from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, toggleTodoStatus } from '../REDUX/todoSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Todo() {
    const dispatch = useDispatch()
    const { todoList } = useSelector((state) => state.todoReducer);

    const completedTodos = todoList.filter(todo => todo.status).length;

    const handleCheck = (id) => {
        dispatch(toggleTodoStatus(id));
        toast.info('ToDo status updated successfully!!!');
    };

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
        toast.info('ToDo deleted successfully!!!');
    };

    return (
        <>
            <div className="rounded mt-2">
                {todoList?.length > 0 ?
                    <div className='mb-3'>
                        <h5>Total Completed Todos: {completedTodos}</h5>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th className='text-center fw-bolder text-warning-emphasis'>Todo List</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todoList?.map((todo) => (
                                    <tr key={todo.id}>
                                        <td>
                                            <Form.Check aria-label="option 1" checked={todo.status} onChange={() => handleCheck(todo.id)} />
                                        </td>
                                        <td className='d-flex justify-content-between'>
                                            {todo.todo}
                                            <Button onClick={() => handleDelete(todo.id)} variant="link text-decoration-none"><i className="fa-solid fa-trash text-danger"></i></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    :
                    <div className="w-100 d-flex justify-content-center align-items-center flex-column mt-4">
                        <h3>Your Todo List is Empty!!!</h3>
                    </div>
                }
            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </>
    )
}

export default Todo