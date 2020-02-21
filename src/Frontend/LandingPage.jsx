import React, {useContext}from "react";
import { Auth0Context } from '../contexts/auth0-context';
import { useHistory } from "react-router-dom";
import HomeScreen from "./HomeScreen";

function LandingPage() {
    const auth0 = useContext(Auth0Context);

    return (
        <div>
            <div>
                <h1>Click Below!</h1>
                <button onClick={() => {auth0.loginWithRedirect()}}>Login</button>
            </div>
    </div>
)}

export default LandingPage