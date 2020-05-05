import React, {useContext} from 'react'
import "./NavBarstyles.css"
import {BrowserRouter as Router, Link} from 'react-router-dom'
import {Auth0Context} from "../Backend/contexts/auth0-context";

function NavBar (props){
    const auth0 = useContext(Auth0Context);

    return(
        <div className="NavBar">
            <div className="NavWrapper">
                <div className="NavBarItem">
                    <Link to="/homescreen" >Home</Link>
                </div>
                <div className="NavBarItem">
                    <Link to="/analytics" >Analytics</Link>
                </div>
            </div>
            <div className="logout-button" onClick={() => {auth0.logout()}}><div>Logout</div></div>
        </div>
    )
}

export default NavBar