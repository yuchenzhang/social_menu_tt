(function() {
  var MemoWindowController;

  MemoWindowController = (function() {

    function MemoWindowController(menu) {
      this.menu = menu;
      this.window = Ti.UI.createWindow({
        backgroundColor: "#000",
        titleid: "memo_window",
        navBarHidden: true
      });
    }

    return MemoWindowController;

  })();

  module.exports = MemoWindowController;

}).call(this);
