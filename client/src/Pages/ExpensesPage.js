import React, {Component} from 'react';
import ExpenseReport from '../components/ExpenseReport';


class ExpensesPage extends Component{
    render(){
        return(
            <div className="ExpensesPage">
                ExpensesPage
                <ExpenseReport/>
            </div>
        );
    }
}

export default ExpensesPage;