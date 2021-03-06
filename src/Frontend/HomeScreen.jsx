import './HomeScreenStyles.css'
import React, {useContext} from "react";
import NavBar from "./NavBar";
import MoodView from "./MoodView";
import axios from 'axios';
import {Auth0Context} from "../Backend/contexts/auth0-context";
import DatePicker from "react-datepicker/es";

class HomeScreen extends React.Component{
    constructor(props) {
        super (props);
        this.state = {
            user: this.props.userProp.user,
            id: this.props.userProp.sub,
            selected: null,
            hinweis: "",
            missing: false,
            success: false,
            moodData: [],
            heuteschon: false
        }
    }

    componentDidMount() {
        axios.get( 'https://www.moodio.xyz/users/' + this.props.userProp.sub )
            .then( res => {
                console.log(res.data.moods);
                this.setState({
                    moodData: res.data.moods
                })
            })
            .catch(err => {console.log(err.data)})

    }

    addZ(n){
        return n<10? '0'+n:''+n;
    }

    getCurrentDate(){

        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (this.addZ(tempDate.getMonth()+1)) + '-' + tempDate.getDate();
        console.log(date)

        return date
    }

    sendButtonPressed(e){
        console.log(this.state.id);
        const found = this.state.moodData.some(el => el.datum === this.getCurrentDate());
        console.log(found);
        if (this.state.selected !== "" && !found) {
            console.log("SEEEND REQUEST");
            console.log(this.state.user);
            console.log(this.state.id);

            var answer = {
                "selected": this.state.selected,
                "hinweis": this.state.hinweis,
                "datum" : this.getCurrentDate()
            };

            console.log(answer);
            console.log(this.state.moodData);

            axios.post('https://www.moodio.xyz/users/update/' + this.props.userProp.sub, { new: answer })
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
            if (found){
                console.log("Du kannst nur einmal am tag eine mood eintragen")
                this.setState({heuteschon: true})
            } else {
                this.setState({
                    missing: true
                });
            }
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
                    <div className="title-mainpage-success">Thank you for Submitting! See you tomorrow {this.props.userProp.given_name}</div>
                    <div className="success-emoji">🎉</div>
                </div>}
                <div className= {!this.state.success ? "box-mainpage" : "box-mainpage1"}>
                    <div className="title-mainpage">Hi {this.props.userProp.given_name} 👋🏻</div>
                    <div className="subheader-mainpage">How do you feel today?</div>
                    <div className="emoji-section">
                        <div className="emoji-wrapper">
                            <div className={this.state.selected === 1 ? "emoji-selected" : "emoji"} onClick={() => this.setState({selected: 1})}>🙁</div>
                            <div className={this.state.selected === 2 ? "emoji-selected" : "emoji"} onClick={() => this.setState({selected: 2})}>😑</div>
                            <div className={this.state.selected === 3 ? "emoji-selected" : "emoji"} onClick={() => this.setState({selected: 3})}>😊</div>
                            <div className={this.state.selected === 4 ? "emoji-selected" : "emoji"} onClick={() => this.setState({selected: 4})}>🎉</div>
                        </div>
                        {this.state.missing && <p className="missed-message">Zum absenden bitte eine Emotion auswählen!</p>}
                    </div>

                    <div className="box-wrapper"><textarea
                         className="comment-box"
                         placeholder="Why do you feel like this?"
                         value={this.state.hinweis}
                         onChange={(evt) => this.updateHinweis(evt)}/></div>
                    <div className="bottom-space">
                            {this.state.heuteschon && <p className="send-failed-text">You already submitted your mood for today. See you tomorrow!</p>}
                            <button className="send-button" onClick={(e) => this.sendButtonPressed(e)}>Send</button>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default HomeScreen