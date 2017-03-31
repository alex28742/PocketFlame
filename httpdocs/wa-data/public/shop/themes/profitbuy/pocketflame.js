
$(document).ready(function(){



  ////// баннер на главной  //////////////

  $(window).scroll(function() {
    var top = $(this).scrollTop();
    if(top > 1024 && top < 1100){
      $('.als-question').css('position','relative');
      console.log('relative');
    }
    else if(top < 1024 && top > 1000){
      $('.als-question').css('position','static');
      console.log('static');
    }

    if(top > 1024){
      var diff = top - 1024;
      $('.als-question').css('top',''+ diff +'px');
      // console.log(diff);
    }
  });
/////////// баннер на главной ///////////






});
