// SETTINGS FOR ANCHOR-JS

// If no selector is provided, it falls back to a default selector of
//'h1, h2, h3, h4, h5, h6' adding anchors to all headings.
anchors.options = {
  placement:  'left',
  icon:       '¶'
};

anchors.add('.single-article > h2, h3, h4, h5, h6');
anchors.remove('.no-anchor');
anchors.remove('#sidebar > h1, h2, h3, h4, h5, h6');
