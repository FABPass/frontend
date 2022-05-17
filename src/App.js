import React from 'react';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import WithoutNav from "./components/Navigation/WithoutNav";
import WithNav from "./components/Navigation/WithNav";
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
                        <Route element={<WithoutNav/>}>
                            <Route path={"/register"} element={<Register/>}/>
                            <Route path={"/login"} element={<Login/>}/>
                        </Route>
                        <Route path={"/"} element={<Login/>}/>
                        <Route element={<WithNav/>}>
                            <Route path={"/dashboard"} element={<Dashboard/>}/>
                        </Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;