(function() {
  var data, image_view, num, scrollView, url, win, _len, _ref;

  data = {
    title: "Greek Lamb",
    pictures: ['http://placehold.it/200x120', 'http://placehold.it/200x120', 'http://placehold.it/200x120', 'http://placehold.it/200x120', 'http://placehold.it/200x120']
  };

  scrollView = Titanium.UI.createScrollView({
    contentWidth: 1000,
    contentHeight: 120,
    top: 10,
    height: 130,
    width: '100%',
    backgroundColor: 'A6AAB0'
  });

  _ref = data.pictures;
  for (num = 0, _len = _ref.length; num < _len; num++) {
    url = _ref[num];
    image_view = Titanium.UI.createImageView({
      image: url,
      width: 200,
      height: 120,
      left: 10 + num * 210,
      top: 5
    });
    scrollView.add(image_view);
  }

  win = Titanium.UI.currentWindow;

  win.backgroundColor = 'white';

  win.add(scrollView);

}).call(this);
