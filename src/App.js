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
import axios from "axios";
import {baseUrl} from "./api/baseUrl";
import {Profile} from "./components/Profile/Profile";
import {ForgotPassword} from "./components/ForgotPassword/ForgotPassword";
import {ChangePassword} from "./components/ChangePassword/ChangePassword";
import {DataItem} from "./components/DataItem/DataItem";
import {Export} from "./api/Export";


const App = () => {


    axios.interceptors.request.use(async request => {
        if(request.url.startsWith("http://localhost:8084/user/forgotPassword")) return request;
        if(request.url.startsWith("http://localhost:8084/user/changePassword")) return request;

        if (request.headers['Authorization'] == null)
            request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
        return request;
        },
            error => {
            Promise.reject(error)
        });

    const onResponse = (response) => { return response}

    const onResponseError = async error => {
        if (error.response.data.message.indexOf("WT expired") >= 0) {
            const rs = await axios.get(baseUrl + "/user/token/refresh", {
                headers: {
                    'Authorization': localStorage.getItem('refreshToken')
                }
            });
            const accessToken = rs?.data?.access_token;
            localStorage.setItem('accessToken', accessToken);
        }
        else
            return Promise.reject(error);
    }

    axios.interceptors.response.use(onResponse, onResponseError);

    return (
        <Router>
            <div>
                <div className={"content"}>
                    <Routes>
                        <Route element={<WithoutNav/>}>
                            <Route path={"/register"} element={<Register/>}/>
                            <Route path={"/login"} element={<Login/>}/>
                            <Route path={"/forgotPassword"} element={<ForgotPassword/>}/>
                            <Route path={"/changePassword/*"} element={<ChangePassword/>}/>
                        </Route>
                        <Route path={"/"} element={<Login/>}/>
                        <Route element={<WithNav/>}>
                            <Route path={"/dashboard"} element={<Dashboard/>}/>
                            <Route path={"/profile"} element={<Profile/>}/>
                            <Route path={"/createDataItem"} element={<DataItem/>}/>
                        </Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;