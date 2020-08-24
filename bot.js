const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');

const Discord = require('discord.js');
const client = new Discord.Client();
// token
const token = 'Set Your Discord bot Token';
client.on('ready', () => {
  console.log('ready...');
});

client.on('message', message => {
  if (message.author.bot) {
    return;
  } else {
    console.log(`Sent message: ${message.author.username}: ${message.content}`);
    io.emit('message', `${message.author.username}: ${message.content}`)
  }
});

// connect to Discord
client.login(token);

io.on('connection', function (socket) {
  socket.on('message', function (msg) {
      io.emit('message', msg);
  });
});

http.listen(PORT, function () {
  console.log('server listening. Port:' + PORT);
});
