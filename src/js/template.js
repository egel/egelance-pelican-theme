// SETTINGS FOR ANCHOR-JS

// If no selector is provided, it falls back to a default selector of
//'h1, h2, h3, h4, h5, h6' adding anchors to all headings.
anchors.options = {
  placement:  'left',
  visible:    'hover',
  icon:       '¶'
};

anchors.add('.single-article h2');
anchors.add('.single-article h3');
anchors.add('.single-article h4');
anchors.add('.single-article h5');
anchors.add('.single-article h6');
anchors.remove('.no-anchor');
anchors.remove('#sidebar h1');
anchors.remove('#sidebar h2');
anchors.remove('#sidebar h3');
anchors.remove('#sidebar h4');
anchors.remove('#sidebar h5');
anchors.remove('#sidebar h6');


$(document).ready(function(){
  //Check to see if the window is top if not then display button
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scrollToTop').fadeIn();
    } else {
      $('.scrollToTop').fadeOut();
    }
  });

  //Click event to scroll to top
  $('.scrollToTop').click(function(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
  });

});

