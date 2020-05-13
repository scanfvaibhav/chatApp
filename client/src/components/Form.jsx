import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';


class Form extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  submit = e => {
    e.preventDefault();
    const { name, email } = this.state;
    axios({
      url: '/add',
      method: 'POST',
      data: {
        name,
        email
      }
    })
      .then((response) => {
        this.props.addUser(response.data);
        this.setState({
          name: '',
          email: ''
        });
      })
      .catch(() => alert('Failed uploading data'))
  };
  render() {
    return (
      <form className="form noValidate" autoComplete="off" onSubmit={this.submit}>
        <h2>Please, Tell us about you</h2>
        <TextField
          id="standard-dense"
          value={this.state.name}
          label="Name"
          name="name"
          onChange={this.handleChange}
        />

        <TextField
          name="email"
          value={this.state.email}
          id="standard-dense"
          onChange={this.handleChange}
          label="Email"
        />

        <Button variant="contained" color="primary" onClick={this.submit}> Submit </Button>
        
      </form>
    );
  }
}

export default Form;
