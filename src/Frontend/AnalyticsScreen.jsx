import './AnalyticsScreenStyles.css'
import React from "react";

class AnalyticsScreen extends React.Component{
    constructor(props) {
        super (props)

    }

    render() {
        return (
            <div className="background-analytics">
                <div className="box-analyticspage">
                    <div className="diagramm-box"></div>
                    <div className="message-box"></div>
                </div>
            </div>
        );
    }

}

export default AnalyticsScreen