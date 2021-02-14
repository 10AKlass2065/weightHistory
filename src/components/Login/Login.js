import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProfileInfo, logIn, signUp} from "../AC";
import {Redirect} from "react-router-dom";
import "./login.sass";

export const Login = () => {
    
    const {error, authorized, loading, userData} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogInChange = (ev) => {
        setEmail(ev.target.value);
    }

    const handlePasswordChange = (ev) => {
        setPassword(ev.target.value);
    }

    const handleLogInButton = () => {
        dispatch(logIn(email, password));
    }

    const handleRegisterButton = () => {
        dispatch(signUp(email, password));
    }

    if (userData.authToken) {
        if(userData.error === 'User not found') {
            localStorage.setItem('authToken', '')
        } else if(userData.weightData !== null){
            return <Redirect to={"/profile"}/>
        } else {
            dispatch(getProfileInfo(userData.authToken))
        }
    }

    return(
        <div className={`login-frame  ${loading ? "pending" : ""}`}>
            <h1 className={"sign-in-h1"}>Sign In</h1>
            <input
                onChange={handleLogInChange}
                value={email}
                className={`login-input ${error ? "error" : ""}`}
                type={"email"}
                placeholder={"Email"}
            />
            <input
                onChange={handlePasswordChange}
                value={password}
                className={`password-input ${error ? "error" : ""}`}
                type={"password"}
                placeholder={"Password"}
            />
            <div className={'login-buttons-container'}>
                <button onClick={handleRegisterButton} className={`sign-in-button`}>Sign Up</button>
                <button onClick={handleLogInButton} className={`sign-in-button`}>Sign In</button>
            </div>
            <p className={"message-box"}>{typeof error === 'string' ? error.replace(/_/g, " ") : ""}</p>
        </div>
    )
}