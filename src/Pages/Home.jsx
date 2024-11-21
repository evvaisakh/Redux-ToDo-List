import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { addTodo, deleteTodo, editTodo, toggleTodo } from '../REDUX/todoSlice';

function Home() {

    const [text, setText] = useState("");
    const [isEditing, setIsEditing] = useState(null); // Track todo being edited
    const [editedText, setEditedText] = useState(""); // Store edited text

    const todos = useSelector((state) => state.todoReducer.todos);
    const completedTodos = todos.filter((todo) => todo.completed).length;
    const dispatch = useDispatch();

    // Add a new Todo
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch(addTodo(text));
            toast.success("Todo added successfully!"); // Toast on add
            setText(""); // Clear input field
        } else {
            toast.error("Please enter a valid todo!");
        }
    };

    // Toggle Todo status (completed or not)
    const handleStatusUpdate = (id) => {
        dispatch(toggleTodo(id));
        toast.info("Todo status updated!"); // Toast on status update
    };

    // Delete Todo
    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
        toast.error("Todo deleted!"); // Toast on delete
    };

    // Start editing a Todo
    const handleEdit = (id, currentText) => {
        setIsEditing(id);
        setEditedText(currentText);
    };

    // Save the edited Todo
    const handleSaveEdit = (id) => {
        if (editedText.trim()) {
            dispatch(editTodo({ id, updatedText: editedText }));
            toast.success("Todo updated successfully!"); // Toast on update
            setIsEditing(null);
            setEditedText(""); // Clear edit state
        } else {
            toast.error("Please enter a valid text for editing!");
        }
    };

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="fw-bold text-center text-success mb-4">ToDo App</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="todoText">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter ToDo"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </Form.Group>
                            <div className="d-flex justify-content-center align-items-center">
                                <Button variant="outline-info" type="submit">
                                    <i className="fa-solid fa-circle-plus pe-2"></i>
                                    Add ToDo
                                </Button>
                            </div>
                        </Form>
                        <hr />
                        <h2 className="text-center text-success-emphasis fw-semibold my-3">
                            All Todos
                        </h2>
                        {todos?.length === 0 ? (
                            <h4 className="text-info fw-semibold">
                                No todos yet. Start adding some!!!
                            </h4>
                        ) : (
                            <>
                                <h5>Total Todos: {todos.length}</h5>
                                <h5>Completed Todos: {completedTodos}</h5>
                                <ul
                                    style={{ listStyleType: "none" }}
                                    className="mt-4"
                                >
                                    {todos?.map((todo) => (
                                        <li
                                            key={todo.id}
                                            className="table shadow w-50 border rounded-1 row row-cols-lg-auto justify-content-between align-items-center p-2"
                                        >
                                            {isEditing === todo.id ? (
                                                <div className='d-flex align-items-center'>
                                                    <Form.Control
                                                        type="text"
                                                        value={editedText}
                                                        onChange={(e) => setEditedText(e.target.value)}
                                                    />
                                                    <Button
                                                        variant="outline-success mx-2 p-1"
                                                        onClick={() => handleSaveEdit(todo.id)}
                                                    >
                                                        <i className="fa-solid fa-check-double text-success"></i>
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="d-flex align-items-center mx-2">
                                                    <div>
                                                        <Form.Check
                                                            type="checkbox"
                                                            label={todo.text}
                                                            checked={todo.completed}
                                                            onChange={() => handleStatusUpdate(todo.id)}
                                                        />
                                                    </div>
                                                    <Button
                                                        variant="outline-warning mx-2 p-1"
                                                        onClick={() => handleEdit(todo.id, todo.text)}
                                                    >
                                                        <i className="fa-solid fa-pen text-warning"></i>
                                                    </Button>
                                                    <Button
                                                        variant="outline-danger mx-2 p-1"
                                                        onClick={() => handleDelete(todo.id)}
                                                    >
                                                        <i className="fa-solid fa-trash text-danger"></i>
                                                    </Button>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </Col>
                </Row>
                <ToastContainer position="top-right" theme="colored" autoClose={3000} />
            </Container>
        </>
    );

}
export default Home