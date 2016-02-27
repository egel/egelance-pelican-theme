// SETTINGS FOR ANCHOR-JS

// If no selector is provided, it falls back to a default selector of
//'h1, h2, h3, h4, h5, h6' adding anchors to all headings.
$(document).ready(function(){
  anchors.options = {
    placement:  'left',
    icon:       '¶'
  };

  anchors.add('.single-article > h2, h3, h4, h5, h6');
  anchors.remove('.no-anchor');
  anchors.remove('#sidebar > h1, h2, h3, h4, h5, h6');

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
