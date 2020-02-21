import './HomeScreenStyles.css'
import React from "react";
import MoodView from "./MoodView";

class HomeScreen extends React.Component{
    constructor(props) {
        super (props);
        this.state = {
            selected: "",
            hinweis: "",
            missing: false
        }
    }

    sendButtonPressed(e){
        if (this.state.selected !== "") {
            console.log("SEEEND REQUEST");

            var data = {
                "selected": this.state.selected,
                "hinweis": this.state.hinweis
            };

            this.setState({
                selected: "",
                hinweis: "",
                missing: false
            });

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
            <div className="background-home">
                <div className="box-mainpage">
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
                    </div>
                    <div className="box-wrapper"><textarea
                         className="comment-box"
                         placeholder="Leave a note here.."
                         value={this.state.hinweis}
                         onChange={(evt) => this.updateHinweis(evt)}/></div>
                    <button className="send-button" onClick={(e) => this.sendButtonPressed(e)}>Send</button>
                </div>
            </div>
        );
    }
}

export default HomeScreen