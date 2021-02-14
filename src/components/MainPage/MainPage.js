import React from 'react';
import {Link} from "react-router-dom";
import "./mainPage.sass";

export const MainPage = () => {

    return(
        <div className="main-page">
            <div className="main-page__welcome-block">
                <p className="main-page__welcome-block__text">
                    Welcome to the weight history service
                </p>
                <Link className={"main-page__welcome-block__get-started action-button"} to={localStorage.getItem("authorized") ? "/news": "login"}>Get Started</Link>
            </div>
        </div>
    )

}