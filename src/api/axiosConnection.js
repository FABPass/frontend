import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {connect} from "react-redux";

const instance_ = axios.create({
    baseURL: 'http://localhost:8084'
});


export const instance = instance_;