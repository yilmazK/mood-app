import React, {useContext} from 'react';
import NavBar from "./Frontend/NavBar";
import HomeScreen from "./Frontend/HomeScreen";
import LandingPage from "./Frontend/LandingPage";
import AnalyticsScreen from "./Frontend/AnalyticsScreen";
import SendLoveScreen from "./Frontend/SendLoveScreen";
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import './App.css';
import HomeScreen1 from "./Frontend/HomeScreen1";
import {Auth0Context} from "./contexts/auth0-context";

function App() {
    const auth0 = useContext(Auth0Context);
  return (
     <Router>
         <div className="App">
             <Route  exact path= "/" render={() => {return <LandingPage />}} />
             <Route   path= "/homescreen" render={() => {return (!auth0.isAuthenticated ? <LandingPage/> : <HomeScreen1/>)}} />
             <Route   path= "/analytics"  render={() => {return (!auth0.isAuthenticated ? <LandingPage/> : <AnalyticsScreen/>)}} />
             <Route   path= "/sendlove"  render={() => {return (!auth0.isAuthenticated ? <LandingPage/> : <SendLoveScreen/>)}} />
         </div>
     </Router>
  );
}

export default App;
