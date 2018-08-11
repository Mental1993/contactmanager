import React, { Component } from 'react';
import axios from 'axios';

import FormGroup from './FormGroup';

import {Consumer} from '../../context';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  onSubmit = (dispatch, e) => {
    e.preventDefault();
    const {name,email,phone} = this.state;
    
    // Check for errors
    if(name === '') {
      this.setState({
        errors: {
          name: 'Name is required'
        }
      });
      return;
    }
    if(email === '') {
      this.setState({
        errors: {
          email: 'Email is required'
        }
      });
      return;
    }
    if(phone === '') {
      this.setState({
        errors: {
          phone: 'Phone is required'
        }
      });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    }
    axios.post('https://jsonplaceholder.typicode.com/users', newContact)
      .then(res => {
        dispatch({type: 'ADD_CONTACT', payload: newContact})
        this.setState({
          name: '',
          email: '',
          phone: '',
          errors: {}
        });

        this.props.history.push('/');
      })
    
  }

  render() {
    const {name,email,phone, errors} = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                  <FormGroup label="Name" name="name" placeholder="Enter Name" value={name} onChange={this.onChange.bind(this)} error={errors.name}/>
                  <FormGroup label="Email" type="email" name="email" placeholder="Enter Email" value={email} onChange={this.onChange.bind(this)} error={errors.email}/>
                  <FormGroup label="Phone" name="phone" placeholder="Enter Phone" value={phone} onChange={this.onChange.bind(this)} error={errors.phone}/>
                  <input type="submit" value="Add Contact" className="btn btn-block btn-dark"/>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default AddContact;
