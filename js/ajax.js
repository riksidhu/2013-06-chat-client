$.ajax('https://api.parse.com/1/classes/testing1234567', {
  contentType: 'application/json',
  success: function(data){
    $('#main').append(data.results.map(function(message){return message.username + ':' + message.text + '<br>'}));
    console.log(data);    
    resp = data
  },
  error: function(data) {
    console.log('Ajax request failed');
  }
});





var makePosts= function(message){
 $.ajax({
    type:"POST",
    contentType: "application/json",
    url:'https://api.parse.com/1/classes/testing1234567',
    data: message,    // multiple data sent using ajax
    error: function(thing){
      console.log(thing);
    },
    success:function(){
      console.log("successful");
    }
  });
};
