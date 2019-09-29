import React, { Component } from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import uuid from 'uuid';

class ExpenseReport extends Component{

    state = {
        expenses:[
            {id: uuid(), name: "rent"},
            {id: uuid(), name: "electricity"},
            {id: uuid(), name: "internet"},
            {id: uuid(), name: "gas"}
        ]
    }

    render(){
        const { expenses } = this.state;
        return(
            <Container>
                <h1>Expense Report</h1>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={()=>{
                        const name = prompt('enter item');
                        if(name){
                            this.setState(state => ({
                                expenses: [...state.expenses,{id: uuid(), name}]
                            }));
                        }
                    }}
                >Add Item
                </Button>
                <ListGroup>
                    {expenses.map(({id,name}) => (
                        <ListGroupItem>
                        <Button 
                            className="remove-btn" 
                            color="danger" 
                            size="sm"
                            onClick={()=>{
                                this.setState(state => ({
                                    expenses: state.expenses.filter(item => item.id !== id)
                                }));
                            }}
                        >&times;
                        </Button>
                        {name}</ListGroupItem>
                    ))}
                </ListGroup>

            </Container>

        );
    }
}

export default ExpenseReport;