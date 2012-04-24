(function() {
  var OrderWindowController;

  OrderWindowController = (function() {

    function OrderWindowController(menu) {
      this.menu = menu;
      this.window = Ti.UI.createWindow({
        backgroundColor: "#f00",
        titleid: "order_window"
      });
    }

    return OrderWindowController;

  })();

  module.exports = OrderWindowController;

}).call(this);
