import './login.scss';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './login.scss';
import axios from 'axios';

function Login() {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });
    const { user, loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();
    const handleChange = (e) => {
        setCredentials((pre) => ({ ...pre, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
            const res = await axios.post('http://localhost:8800/api/auth/login', credentials);
            console.log('data', res.data);
            if (res.data.isAdmin) {
                dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
                navigate('/');
            } else {
                {
                    dispatch({ type: 'LOGIN_FAILURE', payload: { message: 'You are not allowed' } });
                }
            }
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
        }
    };

    return (
        <div className="login">
            <div>
                <h1>ADMIN</h1>
            </div>

            <div className="lContainer">
                <input type="text" placeholder="username" id="username" onChange={handleChange}></input>
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    onChange={handleChange}
                    className="lInput"
                ></input>
                <button onClick={handleClick} className="lButton">
                    Login
                </button>

                <div> {error && <span>{error.message}</span>}</div>
            </div>
        </div>
    );
}

export default Login;
