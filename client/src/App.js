import React from 'react';
import AppNavbar from "./components/AppNavbar"
import {Router, Route} from 'react-router-dom';
import {history} from './helpers';
import {HomePage,
  SettingsPage
} from './Pages';



import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {



  return (
    <div className="App">
      <Router history={history}>

        <AppNavbar/>
        <Route exact path='/' component={HomePage} />
        <Route path= '/settings' component={SettingsPage}/>
      </Router>
    </div>
  );
}

export default App;