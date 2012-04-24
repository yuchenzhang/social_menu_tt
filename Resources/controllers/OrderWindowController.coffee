class OrderWindowController
  constructor: (menu)->
    @menu = menu
    @window = Ti.UI.createWindow
      backgroundColor: "#f00"
      titleid: "order_window"

module.exports = OrderWindowController
