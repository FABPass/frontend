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
import {connect} from "react-redux";
import {instance} from "./api/axiosConnection";
import {useEffect} from "react";
import axios from "axios";

const App = (props) => {

    useEffect(() => {
        const requestInterceptor = ( request => {
            request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
            return request;
        });
        instance.interceptors.request.use(requestInterceptor)
        return () => {axios.interceptors.request.eject(requestInterceptor)}
    })

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

const mapStateToProps = (state) => {
    return {
        accessToken: state.accessToken
    }
}

export default connect(mapStateToProps)(App);