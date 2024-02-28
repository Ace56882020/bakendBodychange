let usuarios = []

const chat = async (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ["GET", "POST"]
    }
  });
  io.on('connection', (socket) => {
    let newUser = ''
    console.log('connection',socket.id)
    // socket.on('disconnect', () => {
    //   // io.emit('users-changed', { user: socket.username, event: 'left' });
    //   removedUser(newUser)
    //   io.emit('removed-user', newUser);
    //   console.log(newUser, "desconectado")
    // });

    // socket.on('set-nickname', (name) => {
    //   socket.username = name;
    //   io.emit('users-changed', { user: name, event: 'joined' });
    // });
    // socket.on('online', (name) => {
    //   newUser = name + '_' + usuarios.length
    //   usuarios.push({ id: socket.id, nombre: name, event: 'joined' })
    //   console.log(newUser + ' Id sockect ' + socket.id, "ver")
    //   io.emit('online-user', usuarios);
    //   console.log(usuarios, "usuarios")
    // });
    socket.on('newMessage', message => {
      console.log(message,'--->')
      io.emit('newMessage', { msg: message.text, user: message.user, createdAt: new Date() });
    });
    socket.on('sms-private', (data) => {
      console.log(data)
      io.to(data.destinatarioID).emit('recive-sms', data)
    });
  });
  removedUser = (user) => {
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].nombre == user) {
        usuarios.splice(i, 1)
        break
      }

    }
  }
};

module.exports = {
  chat
};
