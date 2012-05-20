(function() {
  var TimelineWindowController;

  TimelineWindowController = (function() {

    function TimelineWindowController(user) {
      this.window = Ti.UI.createWindow({
        backgroundColor: "#fee",
        titleid: "timeline_window",
        navBarHidden: true
      });
    }

    return TimelineWindowController;

  })();

  module.exports = TimelineWindowController;

}).call(this);
