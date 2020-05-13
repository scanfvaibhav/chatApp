import React, { Component } from 'react';
import Form from './components/Form';
import DisplayUsers from './components/DisplayUsers';
import axios from 'axios';
import './App.css';
import Home from './components/Home';
class App extends Component {
  state = {
    users: []
  }

  componentDidMount = () => {
    this.fetchUsers();
  };

  fetchUsers = () => {
    axios.get('/users')
      .then((response) => {
        const { users } = response.data;
        this.setState({ users: [...this.state.users, ...users] })
      })
      .catch(() => alert('Error fetching new users'));
  };


  addUser = ({ name, email }) => {
    this.setState({
      users: [...this.state.users, { name, email }]
    });
  };

  render() {
    return (
      <div className="App">
        
        <Home/>
      </div>
    );
  }
}
/*<Form addUser={this.addUser}/>
        < DisplayUsers users={this.state.users} />*/
export default App;
