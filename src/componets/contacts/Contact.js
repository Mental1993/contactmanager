import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';
import {Consumer} from '../../context';

class Contact extends Component {

  state = {
    showContactInfo: false
  }

  onClick = (e) => {
    this.setState({
      showContactInfo: !this.state.showContactInfo
    });
  }

  onDeleteClick = (id,dispatch) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => {
        dispatch({type: 'DELETE_CONTACT', payload: id});
      });

    
  }


  render() {
    const {id,name, email, phone} = this.props.contact;
    const {showContactInfo} = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div style={{display: 'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}className={`card card-body mb-3 card-contact`}>
              <div style={{display:'flex'}}>
                <h4>{name}</h4>
                <i onClick={this.onClick} className={`fa fa-sort-down ml-2`} style={{cursor: 'pointer', fontSize:'22px'}}/>
              </div>                
              <div style={{display:'flex'}}> 
                <Link to={`/contact/edit/${id}`}>
                  <i
                    className="fa fa-pencil mr-2"
                    style={{color:'green', cursor:'pointer', fontSize: '22px'}} />
                </Link>
                <i 
                  className="fa fa-times" 
                  style={{color: 'red', cursor: 'pointer', fontSize: '22px'}} 
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}/>
              </div>
              {showContactInfo ? (
              <ul className={`list-group contact-info-list`}>
                <li className="list-group-item">Email: {email}</li>
                <li className="list-group-item">Phone: {phone}</li>
              </ul>
              ) : null}
            </div>
          )
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default Contact;
