import React, {useContext} from 'react';
import './AnalyticsDiagramm.css'
import Calendar from 'react-github-contribution-calendar';
import {Auth0Context} from "../contexts/auth0-context";


const AnalyticsDiagramm = (props) => {

    const dateArray = [];
    props.props.map(data => {
        dateArray.push(data.datum)
    });

    const mood = [];
    props.props.map(data => {
        mood.push(data.selected)
    });

    var obj1 = {};
    for (var x = 0; x < dateArray.length; x++) {
        Object.assign(obj1, {[dateArray[x]]: mood[x]});
    }
    console.log(obj1);

    var weekNames = ['M', 'D', 'M', 'D', 'F', 'SA', 'SO'];
    var monthNames = ['JA', 'FB', 'MRZ', 'AP', 'MA', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'];
    var panelColors = ['#EEEEEE', '#ff3d00', '#ff9100', '#ffea00', '#c6ff00'];
    var values = {
        '2020-01-01': 4,
        '2020-06-23': 1,
        '2020-06-26': 2,
        '2020-06-27': 3,
        '2020-06-28': 4,
        '2020-06-29': 4
    };
    var until = '2020-12-31';

    return (
        <div className="main-diagramm">
            <Calendar values={obj1} until={until} weekNames={weekNames} monthNames={monthNames} panelColors={panelColors}/>
        </div>
    );
};

export default AnalyticsDiagramm;