$(document).ready( function() {
  var $winHeight = $( window ).height()
  $( '.container' ).height( $winHeight );

  $('.led-yellow').on('click',function(){
    $(this).toggleClass("blink-yellow");
  })


});