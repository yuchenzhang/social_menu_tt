(function() {
  var MenuData, MenuTableView, MenuWindow;

  MenuData = require('ui/menu/MenuData');

  MenuTableView = require('ui/menu/MenuTableView');

  MenuWindow = (function() {

    function MenuWindow(title) {
      var data, self, tableview;
      data = new MenuData;
      self = Ti.UI.createWindow({
        title: data.resto
      });
      tableview = new MenuTableView(data.dishes);
      self.add(tableview);
      return self;
    }

    return MenuWindow;

  })();

  module.exports = MenuWindow;

}).call(this);
