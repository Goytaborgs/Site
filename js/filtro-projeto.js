
$('.filter-btn').on('click', function() {
   
    let type = $(this).attr('id');
    let boxes = $('.project-box');

    $('.main-btn').removeClass('active');
    $(this).addClass('active');

    if(type == 'aut-btn') {
      eachBoxes('aut', boxes);
    } else if(type == 'rc-btn') {
      eachBoxes('rc', boxes);
    }else {
      eachBoxes('all', boxes);
    }
  });

  function eachBoxes(type, boxes) {

    if(type == 'all') {
      $(boxes).fadeIn();
    } else {
      $(boxes).each(function() {
        if(!$(this).hasClass(type)) {
          $(this).fadeOut('slow');
        } else {
          $(this).fadeIn();
        }
      });
    }
  }