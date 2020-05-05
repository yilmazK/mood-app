import React, {useContext}from "react";
import { Auth0Context } from '../Backend/contexts/auth0-context';
import './LandingPagestyles.css'
import { useHistory } from "react-router-dom";
import HomeScreen from "./HomeScreen";

function LandingPage() {
    const auth0 = useContext(Auth0Context);

    return (
        <div>
            <div className="landingpage-background">
                <h1 className="landingpage-header">Hi 👋🏻 <br/> Welcome to your Mood - Tracker </h1>
                <p className="landingpage-description">Our tool enables you to track your daily mood. In our Analytics section you can see how you felt over the year.</p>
                <button className="login-button" onClick={() => {auth0.loginWithRedirect()}}>Login</button>
            </div>
    </div>
)}

export default LandingPage