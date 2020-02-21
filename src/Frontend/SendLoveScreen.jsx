import './SendLoveStyles.css'
import React from "react";
import NavBar from "./NavBar";

class SendLoveScreen extends React.Component{
    constructor(props) {
        super (props)

    }

    render() {
        return (
            <div>
                <NavBar/>
            <div className="background-sendlove">

            </div>
            </div>
        );
    }

}

export default SendLoveScreen