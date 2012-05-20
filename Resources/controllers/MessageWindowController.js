(function() {
  var MessageWindowController;

  MessageWindowController = (function() {

    function MessageWindowController(user) {
      this.window = Ti.UI.createWindow({
        backgroundColor: "#fee",
        titleid: "message_window",
        navBarHidden: true
      });
    }

    return MessageWindowController;

  })();

  module.exports = MessageWindowController;

}).call(this);
