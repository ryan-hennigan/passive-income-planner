import React, {Component} from 'react';
import uuid from 'uuid';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { userActions } from '../actions';



class RegisterModal extends Component{
  state = {
    modal: false,
    name:'',
    email: '',
    password: ''
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) =>{
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();
    //this.setState({['time']: ''});
    if(this.state.name && this.state.email && this.state.password){
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      };

      // Add appt
      this.props.dispatch(userActions.register(newUser));
    }

    // Close Modal
    this.toggle();
  }

  render(){
    return(
      <div>
        <Button className='btn btn-primary'
          style={{marginBottom: '2rem'}}
          onClick={this.toggle}
        >Register</Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader
            toggle={this.toggle}
          >Register User</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit.bind(this)}>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  name="name"
                  id="name"
                  value= {this.state.name}
                  onChange={this.onChange.bind(this)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value= {this.state.email}
                  onChange={this.onChange.bind(this)}
                />
              </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input 
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="password placeholder"
                    value={this.state.password}
                    onChange={this.onChange.bind(this)}
                />
            </FormGroup>
              <FormGroup>
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >Submit</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>

      </div>
    );
  }
}



// const mapStateToProps = (state) => ({
// //   appt: state.appt
// });

export default connect(null)(RegisterModal);