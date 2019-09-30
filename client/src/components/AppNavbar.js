import React, {Component} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

import { userActions } from '../actions';


class AppNavbar extends Component{
    
    state = {
        isOpen: false
    }
    
    toggle = () => {
        this.setState({
            isOpen : !this.state.isOpen
        });
    }

    onClick = (e) => {
        this.props.dispatch(userActions.logout());
      }

    render(){
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">
                            PassiveIncomePlanner
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/profile">Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={this.onClick.bind(this)} href="/">Logout</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );

    }
}



export default AppNavbar;