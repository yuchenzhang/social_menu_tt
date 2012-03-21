(function() {
  var avatar, camera, data, guideline, message, num, row_data, row_view, rows, sub_top_padding, tableview, tag, the_by, top_padding, user, _len;

  data = [
    {
      user: {
        name: 'Vincent Simon',
        avatar: 'http://placehold.it/60x60'
      },
      tag: {
        name: 'AllYouCanEatSushi'
      },
      dish: {
        name: "Unagi",
        picture: "http://placehold.it/200x120"
      }
    }, {
      user: {
        name: 'Vincent Simon',
        avatar: 'http://placehold.it/60x60'
      },
      tag: {
        name: 'WokParadise'
      },
      dish: {
        name: "Tokyo Beef",
        picture: "http://placehold.it/200x120"
      }
    }, {
      user: {
        name: 'Vincent Simon',
        avatar: 'http://placehold.it/60x60'
      },
      tag: {
        name: 'HealthyEating'
      },
      dish: {
        name: "Miso Soap",
        picture: "http://placehold.it/200x120"
      }
    }, {
      user: {
        name: 'Vincent Simon',
        avatar: 'http://placehold.it/60x60'
      },
      tag: {
        name: 'SeanfoodCollect'
      },
      dish: {
        name: "Thai Prawn",
        picture: "http://placehold.it/200x120"
      }
    }
  ];

  rows = [];

  top_padding = 10;

  sub_top_padding = 28;

  for (num = 0, _len = data.length; num < _len; num++) {
    row_data = data[num];
    row_view = Ti.UI.createTableViewRow({
      hasChild: true,
      height: 230
    });
    avatar = Titanium.UI.createImageView({
      image: row_data.user.avatar,
      width: 60,
      height: 60,
      left: 4,
      top: top_padding
    });
    tag = Titanium.UI.createLabel({
      text: row_data.tag.name,
      font: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      width: 'auto',
      textAlign: 'left',
      top: top_padding,
      left: 85,
      height: 16
    });
    the_by = Titanium.UI.createLabel({
      text: 'by',
      font: {
        fontSize: 10
      },
      width: 'auto',
      textAlign: 'left',
      top: sub_top_padding,
      left: 100,
      height: 12
    });
    user = Titanium.UI.createLabel({
      text: row_data.user.name,
      font: {
        fontSize: 12,
        fontWeight: 'bold'
      },
      width: 'auto',
      textAlign: 'left',
      top: sub_top_padding,
      left: 115,
      height: 12
    });
    row_view.add(avatar);
    row_view.add(tag);
    row_view.add(the_by);
    row_view.add(user);
    row_view.addEventListener('click', function() {
      var win;
      win = Titanium.UI.createWindow({
        url: './DishView.js',
        title: 'Dish'
      });
      return Titanium.UI.currentTab.open(win, {
        animated: true
      });
    });
    rows.push(row_view);
  }

  tableview = Titanium.UI.createTableView({
    data: rows,
    top: 40
  });

  Titanium.UI.currentWindow.add(tableview);

  guideline = Titanium.UI.createView({
    top: 0,
    left: 0,
    backgroundColor: 'white',
    height: 40,
    width: 'auto'
  });

  camera = Titanium.UI.createView({
    top: 0,
    right: 0,
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderColor: 'black'
  });

  message = Titanium.UI.createLabel({
    text: 'Please scan the table QR code to obtain your table number',
    font: {
      fontSize: 12,
      fontWeight: 'bold'
    },
    width: 'auto',
    textAlign: 'left',
    top: 5
  });

  guideline.add(message);

  Titanium.UI.currentWindow.add(guideline);

  Titanium.UI.currentWindow.add(camera);

}).call(this);
