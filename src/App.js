import React from 'react';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Redirect,
} from "react-router-dom";

const App = () => {
    return (
        <Router>
            <div>
                <div className={"content"}>
                    <Routes>
                        <Route path={"/register"} element={<Register/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/"} element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;