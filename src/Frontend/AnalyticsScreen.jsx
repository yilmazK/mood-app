import './AnalyticsScreenStyles.css'
import React from "react";
import NavBar from "./NavBar";
import axios from 'axios';

class AnalyticsScreen extends React.Component{
    constructor(props) {
        super (props);
        this.state = {
            moodData: []
        }
    }

    componentDidMount() {
        fetch( 'http://localhost:5000/users' )
            .then( response => response.json())
            .then(data => this.setState({moodData: data[0].moods}));
    }

    getMoodData(){
        console.log("Halllloooo");
        console.log(this.state.moodData[0].selected)
    }

    render() {
        const data = this.state.moodData;
        return data.length !== 0 ? (
    <div>
        <NavBar/>
            <div className="background-analytics">
                <div className="box-analyticspage">
                    <div className="diagramm-box"></div>
                    <div className="messages-wrapper">
                   {this.state.moodData.map(item => {return ( <div className="message-box"> {item.selected} </div> )})}
                    </div>
                </div>
            </div>
    </div>
        ) : (
            <div>Loading...</div>

        );
    }

}

export default AnalyticsScreen