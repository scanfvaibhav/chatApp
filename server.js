
// Importing Modules
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http').Server(express);
const io = require('socket.io')(http);
const Chat = require('../chatApp/models/chat');



// importing files
const routes = require('./routes');

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080; 
const SOCKET_PORT =  process.env.PORT || 8081; // Step 1


// Step 2
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/my_database', {
    useNewUrlParser: true
});

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('User Disconnected');
    });

    socket.on('example_message', async function(msg){
      console.log('message: ' + msg);
      const newChat = new Chat({
        text: msg.newMsg.text,
        user: msg.from,
        readReceipt: false,
        date: Date.now()
    });
    if(io.nsps['/'].adapter.rooms["room-"+msg.from] && io.nsps['/'].adapter.rooms["room-"+msg.from].length > 1) roomno++;
            socket.join("room-"+msg.from);

   //Send this event to everyone in the room.
   
        await newChat.save();
        const chats = await Chat.find({});
        io.sockets.in("room-"+msg.to).emit('newMessage', chats);
    });
   
  });
  io.listen(SOCKET_PORT, () => {
    log(`Socket Server is starting at PORT: ${SOCKET_PORT}`);
});
app.listen(PORT, () => {
    log(`Server is starting at PORT: ${PORT}`);
});