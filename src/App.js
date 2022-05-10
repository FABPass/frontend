import React from 'react';
import Login from "./components/Login/Login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Register from "./components/Register/Register";

const App = () => {
    return (
        <div>
            <Register></Register>
        </div>
    );
};

export default App;