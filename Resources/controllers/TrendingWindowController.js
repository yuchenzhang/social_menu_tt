(function() {
  var TrendingWindowController;

  TrendingWindowController = (function() {

    function TrendingWindowController(user) {
      this.window = Ti.UI.createWindow({
        backgroundColor: "#fee",
        titleid: "trending_window",
        navBarHidden: true
      });
    }

    return TrendingWindowController;

  })();

  module.exports = TrendingWindowController;

}).call(this);
