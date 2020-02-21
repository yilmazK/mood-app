import './HomeScreenStyles.css'
import React, {useContext} from "react";
import NavBar from "./NavBar";
import MoodView from "./MoodView";
import axios from 'axios';
import {Auth0Context} from "../contexts/auth0-context";

class HomeScreen extends React.Component{
    constructor(props) {
        super (props);
        this.state = {
            user: this.props.userProp.user,
            id: this.props.userProp.sub,
            selected: "",
            hinweis: "",
            missing: false,
            success: false,
        }
    }


    createNewUser(){
        axios.post('http://localhost:5000/users/add', {
            username: "Yilmaz" + Math.random()
        })
            .then(res => {
                this.setState({
                    id: res.data._id
                });
                console.log(res.data._id)
            });
    }

    sendButtonPressed(e){
        console.log(this.state.id)
        if (this.state.selected !== "") {
            console.log("SEEEND REQUEST");
            console.log(this.state.user);
            console.log(this.state.id);

            var answer = {
                "selected": this.state.selected,
                "hinweis": this.state.hinweis,
                "datum" : + new Date()
            };

            axios.post('http://localhost:5000/users/update/' + this.props.userProp.sub, { new: answer })
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        selected: "",
                        hinweis: "",
                        missing: false,
                        success: true
                    });
                })
                .catch(err => {
                    console.log(err.data)
                })

        } else {
            this.setState({
                missing: true
            });
        }
    }

    updateHinweis (evt) {
        this.setState({
            hinweis: evt.target.value
        });
    }

    render() {
        return (
            <div>
                <NavBar/>
            <div className="background-home">
                {this.state.success &&   <div className="box-mainpage-success">
                    <div className="title-mainpage">See you tomorrow, Yilmaz</div>
                    <div className="success-emoji">🎉</div>
                </div>}
                <div className= {!this.state.success ? "box-mainpage" : "box-mainpage1"}>
                    <div className="title-mainpage">Hi Yilmaz 👋🏻</div>
                    <div className="subheader-mainpage">How do you feel today?</div>
                    <div className="emoji-section">
                        <div className="emoji-wrapper">
                            <div className="emoji" id="first" onClick={() => this.setState({selected: "first"})}>😐</div>
                            <div className="emoji" id="second" onClick={() => this.setState({selected: "two"})}>😴</div>
                            <div className="emoji" id="third" onClick={() => this.setState({selected: "third"})}>😁</div>
                            <div className="emoji" id="fourth" onClick={() => this.setState({selected: "fourth"})}>😎</div>
                            <div className="emoji" id="five" onClick={() => this.setState({selected: "fifth"})}>🤢</div>
                            <div className="emoji" id="six" onClick={() => this.setState({selected: "six"})}>😢</div>
                        </div>
                        {this.state.missing && <p className="missed-message">Zum absenden bitte eine Emotion auswählen!</p>}
                    </div>

                    <div className="box-wrapper"><textarea
                         className="comment-box"
                         placeholder="Why did you choose that emoji?"
                         value={this.state.hinweis}
                         onChange={(evt) => this.updateHinweis(evt)}/></div>
                    <button className="send-button" onClick={(e) => this.sendButtonPressed(e)}>Send</button>
                </div>
            </div>
            </div>
        );
    }
}

export default HomeScreen