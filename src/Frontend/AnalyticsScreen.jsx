import './AnalyticsScreenStyles.css'
import React from "react";
import NavBar from "./NavBar";
import axios from 'axios';
import AnalyticsDiagramm from "./AnalyticsDiagramm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AnalyticsScreen extends React.Component{
    constructor(props) {
        super (props);
        this.state = {
            user: this.props.userProp.user,
            id: this.props.userProp.sub,
            moodData: [],
            choosen: [],
            startDate: new Date(),
            keinEintrag: false
        }
    }

    componentDidMount() {
        console.log(this.props.userProp.sub);
        axios.get( 'http://localhost:5000/users/' + this.props.userProp.sub )
            .then( res => {
                console.log(res.data.moods);
                this.setState({
                    moodData: res.data.moods,
                })
            })
            .catch(err => {console.log(err.data)})
    }

    addZ(n){
        return n<10? '0'+n:''+n;
    }

    addD(d){
        return d<10? '0'+d:''+d;
    }

    changeFormat(date){
        this.setState({choosen: []});
        var newDate = date.getFullYear() + '-' + (this.addZ(date.getMonth()+1)) + '-' + (this.addD(date.getDate()));
        console.log(newDate)
        this.getCorrectMood(newDate);
        return newDate
    }

    getCorrectMood(date){
        console.log("Hier");
        for (var i = 0; i < this.state.moodData.length; i++) {
            if (this.state.moodData[i]['datum'] === date) {
                var choosen = this.state.moodData[i];
                console.log(choosen);
                var choosenArray = [];
                choosenArray.push(choosen);
                this.setState({choosen: choosenArray});
            }
            else{
                this.setState({keinEintrag: true})
                console.log("kein Eintrag an dem Datum")
            }
        }
        return null;
    }

    render() {
        const data = this.state.moodData;
        return data.length !== 0 ? (
    <div>
        <NavBar/>
            <div className="background-analytics">
                <div className="box-analyticspage">
                    <div className="analytics-wrapper">
                        <div className="diagramm-box">
                            <AnalyticsDiagramm props = {this.state.moodData}/>
                        </div>
                        <div className="pie-box">
                            hallo
                        </div>
                    </div>
                    <div>
                        <div className="picker-section">
                                <p className="select-picker-header">Select a date:</p>
                                 <DatePicker
                                     className = "datepicker-analyitcs"
                                    selected={this.state.startDate}
                                    onChange={(date) => {
                                        this.changeFormat(date);
                                        this.setState({startDate: date})
                                    }}
                                 />
                                <div className="all-button" onClick={() => {this.setState({choosen: [], startDate: new Date (), keinEintrag: false})}}>
                                    All
                                </div>
                        </div>
                    </div>
                    <div className="messages-wrapper">
                        {this.state.choosen.length === 1 ?
                            <div className="message-box">
                                <p> {this.state.choosen[0].selected === 1 ? "🙁" : this.state.choosen[0].selected === 2 ? "😐" : this.state.choosen[0].selected === 3 ? "😊" : this.state.choosen[0].selected === 4 && "🎉"  } </p>
                                <p>{this.state.choosen[0].hinweis}</p>
                            </div> : this.state.keinEintrag ?
                                <div className="message-box">
                                    <p> Kein Eintrag an der Stelle </p>
                                </div> :
                       this.state.moodData.map(item => {return ( <div className="message-box">
                       <p> {item.selected === 1 ? "🙁" : item.selected === 2 ? "😐" : item.selected === 3 ? "😊" : item.selected === 4 && "🎉"} </p>
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