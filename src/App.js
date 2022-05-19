import React, {useContext} from 'react';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import WithoutNav from "./components/Navigation/WithoutNav";
import WithNav from "./components/Navigation/WithNav";
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Redirect,
} from "react-router-dom";
import AuthContext from "./context/AuthProvider";
import axios from "axios";


const App = () => {

    const {auth} = useContext(AuthContext);

    axios.interceptors.request.use(async request => {
        console.log("OVO JE ACCESS TOKEN")
        console.log(auth)
        request.headers = {
        'Authorization': `Bearer ${auth.accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
        }
        return request;
        },
            error => {
            Promise.reject(error)
        });

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