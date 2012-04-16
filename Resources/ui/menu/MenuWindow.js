(function() {
  var MenuData, MenuTableView, MenuWindow;

  MenuData = require('ui/menu/MenuData');

  MenuTableView = require('ui/menu/MenuTableView');

  MenuWindow = (function() {

    function MenuWindow(uuid) {
      var data, self, tableview;
      data = new MenuData(uuid);
      self = Ti.UI.createWindow({
        title: data.restaurant.name
      });
      tableview = new MenuTableView(data.dishes);
      self.add(tableview);
      return self;
    }

    return MenuWindow;

  })();

  module.exports = MenuWindow;

}).call(this);
