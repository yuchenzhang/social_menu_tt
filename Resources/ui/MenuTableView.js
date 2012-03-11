(function() {
  var data, tableview;

  data = [];

  data[0] = Ti.UI.createTableViewRow({
    hasChild: true,
    title: 'Row 1'
  });

  data[1] = Ti.UI.createTableViewRow({
    hasDetail: true,
    title: 'Row 2'
  });

  data[2] = Ti.UI.createTableViewRow({
    hasCheck: true,
    title: 'Row 3'
  });

  data[3] = Ti.UI.createTableViewRow({
    title: 'Row 4'
  });

  data[0].addEventListener('click', function() {
    var win;
    win = Titanium.UI.createWindow({
      url: './DishView.js',
      title: 'Dish'
    });
    return Titanium.UI.currentTab.open(win, {
      animated: true
    });
  });

  tableview = Titanium.UI.createTableView({
    data: data
  });

  Titanium.UI.currentWindow.add(tableview);

}).call(this);
