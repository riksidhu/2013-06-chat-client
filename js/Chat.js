var startdate=new Date();
var newDateObj = new Date(startdate.getTime() - 10*60000);
var timestamp= JSON.stringify(newDateObj.toISOString());



var Chat = function(options,room) {
  
  this.username = options.username;
  this.friends=[];
  this.resource = room || 'test1234'

  // Add listeners
  $('#form').on('submit', this.handleSubmit.bind(this));
  // $("#chat").click(function() {
  //     console.log('inside main');
  //     var div_id = $(this).children();
  //     console.log(div_id);
  // });
  
  $('.currentrm').text(this.resource)



    // "Perma-bind" this.getMessages so it always runs in the context of this
  this.getMessages = this.getMessages.bind(this);

  // Immediately get messages
  this.getMessages();
  // setInterval(function(){self.getMessages()},5000);
  // setInterval(this.getMessages.bind(this),5000);
  setInterval(this.getMessages, options.pollTime);
  this.boldFriends();
};


Chat.prototype.boldFriends = function(friend){
  //debugger
  if (friend){
    $(".friendsnames").append("<p>"+friend+"</p>");
    this.friends.push(friend);
  }
  for (var i =0; i<this.friends.length;i++){
    var userandmsg='.'+this.friends[i]+"_msg";
    console.log($(userandmsg))
    $(userandmsg).addClass("bold");
  }

};

Chat.prototype.handleSubmit = function(evt) {
  // Get the message text frmo the DOM, call sendmessage
  //;
  this.sendMessage($('#message').val(),$('#user').val());
  

  // Stop the form from submitting -- without this, the page will refresh
  // It will send a GET request with the parameters in the form
  return false;

  // evt.preventDefault(); // default action of form is to submit itself, LOADING A NEW PAGE
};

Chat.prototype.sendMessage = function(message,username) {
  var data = {
    text: message,
    username: username
  };
  console.log('Sending message:', data);

  $.ajax({
    type:"POST",
    contentType: "application/json",
    url:'https://api.parse.com/1/classes/'+ this.resource,
    data: JSON.stringify(data),
    error: function(jqXHR, errorText, error) {
      alert(errorText);
    },
    success:function(response, statusText, jqXHR) {
      console.log("Successful", response);
    }
  });
};

Chat.prototype.getMessages = function() {
  var that=this

  $.ajax('https://api.parse.com/1/classes/'+ this.resource, {
    type: "GET",
    contentType: 'application/json',
    data: {
      'limit': '30',
      'where':'{"createdAt":{"$gt":{"__type":"Date","iso":'+timestamp+'}}}'},
    success: function(data){
      data=data.results;
      console.log(data)
      console.log('data',data)
      if (data.length === 0){
        return
      }
      timestamp = data[data.length-1].createdAt
      timestamp = '"'+timestamp+'"'
      userelem=($('.message'))
      if (userelem.length > 20){
        userelem.slice(0,userelem.length-20).remove();
      }
      if(data.length>0){
        $('#chat').append(data.map(function(message) {
          return "<div class='message'><span class='user'>"+message.username+"</span>" + ':' 
                 + "<span class="+message.username+"_msg>"+message.text + "</span>"+"</div>";


      }));
      }
      $('.user').on('click', function() {
        var answer=prompt('do you want to friend '+ $(this).text());
        if ( answer === "yes"){
          that.boldFriends($(this).text());
        }
      });
    },
    error: function(data) {
      alert('Failed to fetch messages!');
    }
  });

};



var AddRoom = function(room){
  debugger
  room = $('#rm').val();
  chat = new Chat({
           // actually needs to come from the URL
          pollTime: 5000
        },room);
};




