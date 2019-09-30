  
import React, { Component } from 'react';

import { connect } from 'react-redux';

import LoginComp from '../components/LoginComp';

class HomePage extends Component{

    render(){
        const {loggedIn} = this.props;
        const {user} = this.props;

        return(
            <div className="HomePage">
                {!loggedIn && 
                
                    <LoginComp/>
                }
                {loggedIn && 

                    <h1>hello {user && user.user && user.user.name && user.user.name}</h1>
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    const {loggedIn, user} = state.authentication;
    return{
      loggedIn,
      user
    };
  };

  export default connect(mapStateToProps)(HomePage);