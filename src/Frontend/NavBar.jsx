import React from 'react'
import "./NavBarstyles.css"
import {BrowserRouter as Router, Link} from 'react-router-dom'

function NavBar (props){
    return(
        <div className="NavBar">
            <div className="NavWrapper">
                <div className="NavBarItem">
                    <Link to="/" >Home</Link>
                </div>
                <div className="NavBarItem">
                    <Link to="/analytics" >Analytics</Link>
                </div>
                <div className="NavBarItem">
                    <Link to="/sendlove" >Send️</Link>
                </div>
            </div>
        </div>
    )
}

export default NavBar