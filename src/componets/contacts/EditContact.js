import React, { Component } from 'react';


import FormGroup from './FormGroup';

import {Consumer} from '../../context';
import axios from '../../../node_modules/axios';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }

  async componentDidMount() {
    const {id} = this.props.match.params;
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    const {name, email, phone} = res.data;
    this.setState({
      name,
      email,
      phone
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  async onSubmit(dispatch, e) {
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
    const updContact = {
      name,
      email,
      phone
    }

    const {id} = this.props.match.params;
    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);
    dispatch({type:'UPDATE_CONTACT', payload: res.data})

    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    this.props.history.push('/');
  }

  

  render() {
    const {name,email,phone, errors} = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                  <FormGroup label="Name" name="name" placeholder="Enter Name" value={name} onChange={this.onChange.bind(this)} error={errors.name}/>
                  <FormGroup label="Email" type="email" name="email" placeholder="Enter Email" value={email} onChange={this.onChange.bind(this)} error={errors.email}/>
                  <FormGroup label="Phone" name="phone" placeholder="Enter Phone" value={phone} onChange={this.onChange.bind(this)} error={errors.phone}/>
                  <input type="submit" value="Edit Contact" className="btn btn-block btn-dark"/>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default EditContact;
