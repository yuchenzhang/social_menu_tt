class TimelineWindowController
  constructor: (user)->
    @window = Ti.UI.createWindow
      backgroundColor: "#fee"
      titleid: "timeline_window"
      navBarHidden: true
    
    timeline = new Ti.Model.Timeline
    timeline.fetch()
    timeline_view = new Ti.View.TimelineView timeline
    @window.add timeline_view.render()
     
module.exports = TimelineWindowController