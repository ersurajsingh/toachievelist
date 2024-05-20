import React from 'react';
import TodoList from './components/TodoList';
import './App.css';
const App = () => {
    return (
        <div>
            <div className="navbar">
                <h1>To ACHIEVE List</h1>
            </div>
            <TodoList />
        </div>
    );
};



export default App;
