$(function(){
     function buildHTML(message){
      if ( message.image ) {
        var html =
         `<div class="chat-main__message" data-message-id=${message.id}>
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
      } else {
        var html =
         `<div class="chat-main__message" data-message-id=${message.id}>
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

    //  $('#submit-btn').removeAttr('data-disable-with')
     $('.submit-btn').prop('disabled', false)
    })
      .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop('disabled', false)
  });

})
});