// powered by i {at} isclab.org + 匿名 2012-10-09
// http://i.isclab.org
$(document).ready(function(){
  $("#ID_MYCIPHER").keypress(function(event){
    if (event.keyCode == 13){
      Fuck();
    }
  });
  $("#ID_FUCK").click(function(){
    Fuck();    
  });
});