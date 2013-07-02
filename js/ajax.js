$.ajax('https://api.parse.com/1/classes/messages', {
  contentType: 'application/json',
  data: {'order':'-createdAt',
        'limit': '30'},
  success: function(data){
    $('#main').append(data.results.map(function(message){return message.username + ':' + message.text + '<br>'}));
  },
  error: function(data) {
    console.log('Ajax request failed');
  }
});





var makePosts= function(message){
 $.ajax({
    type:"POST",
    contentType: "application/json",
    url:'https://api.parse.com/1/classes/messages',
    data: message,    // multiple data sent using ajax
    error: function(thing){
      console.log(thing);
    },
    success:function(){
      console.log("successful");
    }
  });
};
