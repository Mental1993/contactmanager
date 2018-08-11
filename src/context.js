import React, {Component} from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state,action) => {
  switch(action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      }
    case 'ADD_CONTACT': 
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      }
    case 'UPDATE_CONTACT' :
      return {
        ...state,
        contacts: state.contacts.map(contact => contact.id === action.payload.id ? (contact = action.payload) : contact)
      }
    default: 
      return state;
  }
}

export class Provider extends Component {
  state = {
    contacts: [
      
    ],
    loading: true,
    dispatch: action => {
      this.setState(state => reducer(state,action));
    }
  }

  componentDidMount() {
    setTimeout(() => {
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => this.setState({
        contacts: res.data,
        loading: false
      })
    );
    }, 300);
    
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;