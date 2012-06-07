(function() {
  var TimelineWindowController;

  TimelineWindowController = (function() {

    function TimelineWindowController(user) {
      var timeline, timeline_view;
      this.window = Ti.UI.createWindow({
        backgroundColor: "#fee",
        titleid: "timeline_window",
        navBarHidden: true
      });
      timeline = new Ti.Model.Timeline;
      timeline.fetch();
      timeline_view = new Ti.View.TimelineView(timeline);
      this.window.add(timeline_view.render());
    }

    return TimelineWindowController;

  })();

  module.exports = TimelineWindowController;

}).call(this);
