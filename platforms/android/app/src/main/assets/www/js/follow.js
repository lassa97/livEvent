$(function(){
   $('.follow-game').click(function(){
      follow_game(this);
   });
});
function follow_game(obj){
game_id = $(obj).attr('data-game_id');

$.ajax({
  url: '/follow.php',
  type: 'POST',
  dataType: 'json',
  data: {
    game_id : game_id
  },
  success: function(rs){
    alert("yay");
  }
});