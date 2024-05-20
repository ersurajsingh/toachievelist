import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './Todo';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            const res = await axios.get('http://localhost:3000/todos');
            setTodos(res.data);
        };

        fetchTodos();
    }, []);

    const addTodo = async () => {
        if (text.trim()) {
            const res = await axios.post('http://localhost:3000/todos', { text, completed: false });
            setTodos([...todos, res.data]);
            setText('');
        }
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:3000/todos/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    const updateTodo = async (id, completed) => {
        const res = await axios.post(`http://localhost:3000/todos/update/${id}`, { completed });
        setTodos(todos.map(todo => todo._id === id ? res.data : todo));
    };

    const editTodo = async (id, text) => {
        const res = await axios.post(`http://localhost:3000/todos/update/${id}`, { text });
        setTodos(todos.map(todo => todo._id === id ? res.data : todo));
    };

    const deleteAllTodos = async () => {
        await axios.delete('http://localhost:3000/todos');
        setTodos([]);
    };

    return (
        <div className="container">
            <div className="navbar">
                <h1>To ACHIEVE List</h1>
                <button className="button delete-all" onClick={deleteAllTodos}>Delete All</button>
            </div>
            <div className="input-group">
                <input
                    type="text"
                    className="input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a new todo"
                />
                <button className="button" onClick={addTodo}>Add</button>
            </div>
            <ul className="todo-list">
                {todos.map(todo => (
                    <Todo key={todo._id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} editTodo={editTodo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
