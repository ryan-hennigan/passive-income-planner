import React from 'react';
import AppNavbar from "./components/AppNavbar"
import ExpenseReport from "./components/ExpenseReport";
import {Router, Route} from 'react-router-dom';
import {history} from './helpers';
import {HomePage,
  ProfilePage, 
  IncomesPage, 
  ExpensesPage
} from './Pages';



import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {



  return (
    <div className="App">
      <Router history={history}>

        <AppNavbar/>
        <Route exact path='/' component={HomePage} />
        <Route path= '/profile' component={ProfilePage}/>
        <Route path= '/expenses' component={ExpensesPage}/>
        <Route path= '/incomes' component={IncomesPage}/>
      </Router>
    </div>
  );
}

export default App;