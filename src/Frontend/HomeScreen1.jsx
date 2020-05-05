import React, { useContext } from 'react';
import { Auth0Context } from '../Backend/contexts/auth0-context';
import HomeScreen from "./HomeScreen";
import './HomeScreenStyles.css'

function HomeScreen1() {
    const auth0 = useContext(Auth0Context);
    console.log(auth0.user);

    return (
        <div>
            <HomeScreen userProp= {auth0.user} />
        </div>
    );
}

export default HomeScreen1;