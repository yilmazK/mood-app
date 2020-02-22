import './AnalyticsScreenStyles.css'
import React from "react";
import NavBar from "./NavBar";
import axios from 'axios';
import AnalyticsDiagramm from "./AnalyticsDiagramm";
import DatePicker from "react-datepicker";
import ReactMinimalPieChart from "react-minimal-pie-chart";
import "react-datepicker/dist/react-datepicker.css";
import {mockComponent} from "react-dom/test-utils";

class AnalyticsScreen extends React.Component{
    constructor(props) {
        super (props);
        this.state = {
            user: this.props.userProp.user,
            id: this.props.userProp.sub,
            moodData: [],
            choosen: [],
            startDate: new Date(),
            keinEintrag: false,
            sad: 0,
            ok: 0,
            good: 0,
            sueper: 0

        }
    }

    componentDidMount() {
        console.log(this.props);
        axios.get( 'http://localhost:5000/users/' + this.props.userProp.sub )
            .then( res => {
                console.log(res.data.moods);
                this.setState({
                    moodData: res.data.moods,
                });
                this.calculatePie();
            })
            .catch(err => {console.log(err.data)})
    }

    calculatePie(){
        const mood = [];
        this.state.moodData.map(data => {
            mood.push(data.selected)
        });
        this.setState({sad: Math.round( ((mood.filter((v) => (v === 1 )).length / mood.length) * 100) *  100) / 100});
        this.setState({ok: Math.round( ((mood.filter((v) => (v === 2 )).length / mood.length) * 100) *  100) / 100});
        this.setState({good: Math.round( ((mood.filter((v) => (v === 3 )).length / mood.length) * 100) *  100) / 100});
        this.setState({sueper: Math.round( ((mood.filter((v) => (v === 4 )).length / mood.length) * 100) *  100) / 100});
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
        console.log(newDate);
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
                            <ReactMinimalPieChart className="pie-pie" animate={false} animationDuration={500} animationEasing="ease-out" cx={50} cy={50} data={[
                                {color: '#ff3d00', title: 'sad', value: this.state.sad},
                                {color: '#ff9100', title: 'ok', value: this.state.ok},
                                {color: '#ffea00', title: 'good', value: this.state.good},
                                {color: '#c6ff00', title: 'sueper', value: this.state.sueper}]}
                                 label labelPosition={50} labelStyle={{fill: '#121212', fontFamily: 'Poppins', fontSize: '5px'}}
                                  lengthAngle={360} lineWidth={100} onClick={undefined} onMouseOut={undefined} onMouseOver={undefined}
                                  paddingAngle={0} radius={50} rounded={false} startAngle={0} viewBoxSize={[100, 100]}/>
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