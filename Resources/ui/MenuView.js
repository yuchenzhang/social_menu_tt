(function() {
  var MenuView;

  MenuView = (function() {

    function MenuView(title) {
      var self;
      self = Ti.UI.createWindow({
        title: title,
        url: "./ui/MenuTableView.js"
      });
      return self;
    }

    return MenuView;

  })();

  module.exports = MenuView;

}).call(this);
