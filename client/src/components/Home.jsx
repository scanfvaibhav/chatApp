import React, { Component } from 'react';
import 'whatwg-fetch';
import openSocket from 'socket.io-client';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { TextField, Button ,panel,List} from '@material-ui/core';

const { isEmpty } = require('lodash');

const socket = openSocket('http://localhost:8081');

class Home extends Component {
  constructor(props) {
    super(props);
    this.boxRef = React.createRef();
    this.state = {
      counters: [],
      text:"",
      from:"",
      to:""
    };


    this.sendSocketIO = this.sendSocketIO.bind(this);
  }

  componentDidMount() {
    this.socketInit();
  }

  

  

  

  
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  scrollChatToBottom() {
    this.boxRef.current.scrollTop = this.boxRef.current.scrollHeight;

  }
  sendSocketIO() {
    socket.emit('example_message', 
    {
        newMsg:{
            text:this.state.text
        },
        from:this.state.from,
        to:this.state.to
    });
  }
  socketInit(){
  socket.on("newMessage", data => {
   this.setState({"chat":data});
   this.scrollChatToBottom();
  });
}
  render() {
    return (
        <div>
            <div className="users">
            <div>
            <TextField
            id="standard-dense"
            value={this.state.from}
            name="from"
            label="from"
            onChange={this.handleChange}
          /> 
          <TextField
          id="standard-dense"
          value={this.state.to}
          name="to"
          label="To"
          onChange={this.handleChange}
        />
                <div className="chatPanel" ref={this.boxRef}>
                <List>
                    {!isEmpty(this.state.chat) ?this.state.chat.map(({ user, text,readReceipt }, key) => (
                        <p key={key}>
                             {(user==this.state.from)?"me":user}:{text}:{readReceipt?'//':'/'} 
                        </p>
                    )):null}
                </List>
                </div>
               
                <div className="chat">
                <TextField
                id="standard-dense"
                value={this.state.text}
                name="text"
                onChange={this.handleChange}
              />  
             
                      <button onClick={this.sendSocketIO}>Send Socket.io</button>
                </div>
            </div>

        </div>
       
        </div>
     
    );
  }
}

export default Home;