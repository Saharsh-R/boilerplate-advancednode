$(document).ready(function () {
  // Form submittion with new message in field with id 'm'

  let socket = io();

  socket.on('user count', function (data) {
    console.log(data);
  });

  socket.on('user', data => {
    $('#num-users').text(data.currentUsers + ' users online');
    let message =
      data.name +
      (data.connected ? ' has joined the chat.' : ' has left the chat.');
    $('#messages').append($('<li>').html('<b>' + message + '</b>'));
  });

  socket.on('chat message', (data) => {
    console.log('socket.on 1');
    $('#messages').append($('<li>').text(`${data.name}: ${data.message}`));
  });

  $('form').submit(function () {
    var messageToSend = $('#m').val();
    socket.emit('chat message', messageToSend);

    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
});
