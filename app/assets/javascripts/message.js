$(function(){
  var buildHTML = function(message) {
    if ( message.content && message.image) {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="chat-main__messages__box1__upper-info1">
          <div class="chat-main__messages__box1__upper-info1__talker1">
            ${message.user_name}
          </div>
          <div class="chat-main__messages__box1__upper-info1__date1">
            ${message.created_at}
          </div>
          </div>
          <div class="chat-main__messages__box1__text1">
            <p class="lower-message__content">
             ${message.content}
            </p>
          </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else if (message.content) {
        var html =
         `<div class="message" data-message-id=${message.id}>
            <div class="chat-main__messages__box1__upper-info1">
              <div class="chat-main__messages__box1__upper-info1__talker1">
                ${message.user_name}
              </div>
              <div class="chat-main__messages__box1__upper-info1__date1">
                ${message.created_at}
              </div>
            </div>
            <div class="chat-main__messages__box1__text1">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      } else if (message.image) {
        var html = 
         `<div class="message" data-message-id=${message.id}>
           <div class="chat-main__messages__box1__upper-info1">
             <div class="chat-main__messages__box1__upper-info1__talker1">
              ${message.user_name}
            </div>
            <div class="chat-main__messages__box1__upper-info1__date1">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__messages__box1__text1">
            <img src=${message.image}"class="lower-message__image" >
          </div>
        </div>`
      return html;
      };
    }
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.chat-main__messages').append(html);      
        $('form')[0].reset();
      
      
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});

      $('.submit-btn').prop('disabled', false)
      })
        .fail(function() {
        alert("メッセージ送信に失敗しました");
        $('.submit-btn').prop('disabled', false)
        });
  })
    var reloadMessages = function() {
      last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
          console.log(messages);
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.chat-main__messages').append(insertHTML);
          $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
        }
      })
      .fail(function() {
        console.log('error');
      });
    };
    
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});