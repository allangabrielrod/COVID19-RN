(function(){
  var message = $("#mapa #message");
  var paths = $("#mapa svg path");
  paths.each(function(index, element) {
    var $element = $(element);
    $element.hover(function() {
      var confirmed = $element.attr('data-confirmed') || 0;
      if(confirmed === 0)
        message.text('nenhum caso confirmado');
      else if(confirmed === '1')
        message.text('1 caso confirmado');
      else 
        message.text(confirmed + ' casos confirmados');

      message.css('top', $element.position().top);
      message.css('left', $element.position().left);
    });
  });
})();