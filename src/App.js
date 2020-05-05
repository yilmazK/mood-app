import React, {useContext} from 'react';
import LandingPage from "./Frontend/LandingPage";
import AnalyticsScreen1 from "./Frontend/AnalyticsScreen1";
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
             <Route   path= "/analytics"  render={() => {return (!auth0.isAuthenticated ? <LandingPage/> : <AnalyticsScreen1/>)}} />
         </div>
     </Router>
  );
}

export default App;
