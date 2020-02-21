import './AnalyticsScreenStyles.css'
import React from "react";
import NavBar from "./NavBar";
import axios from 'axios';

class AnalyticsScreen extends React.Component{
    constructor(props) {
        super (props);
        this.state = {
            user: this.props.userProp.user,
            id: this.props.userProp.sub,
            moodData: []
        }
    }

    componentDidMount() {
        console.log(this.props.userProp.sub);
        axios.get( 'http://localhost:5000/users/' + this.props.userProp.sub )
            .then( res => {
                console.log(res.data.moods);
                this.setState({
                    moodData: res.data.moods
                })
            })
            .catch(err => {console.log(err.data)})

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
                   {this.state.moodData.map(item => {return ( <div className="message-box">
                       <p> {item.selected} </p>
                       <p>{item.hinweis}</p>
                   </div> )})}
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