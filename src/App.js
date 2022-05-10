import React from 'react';
import Login from "./components/Login/Login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

const App = () => {
    return (
        <div>
            <Login></Login>
        </div>
    );
};

export default App;