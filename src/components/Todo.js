import React, { useState } from 'react';
import './Todo.css';

const Todo = ({ todo, deleteTodo, updateTodo, editTodo }) => {
    const [editMode, setEditMode] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    const handleDelete = () => {
        deleteTodo(todo._id);
    };

    const handleToggle = () => {
        updateTodo(todo._id, !todo.completed);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        editTodo(todo._id, newText);
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditMode(false);
        setNewText(todo.text);
    };

    return (
        <li className="todo-item">
            {editMode ? (
                <>
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <span
                        className={`todo-text ${todo.completed ? 'completed' : ''}`}
                        onClick={handleToggle}
                    >
                        {todo.text}
                    </span>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </li>
    );
};

export default Todo;
