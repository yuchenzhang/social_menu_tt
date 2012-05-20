class TimelineWindowController
  constructor: (user)->
    @window = Ti.UI.createWindow
      backgroundColor: "#fee"
      titleid: "timeline_window"
      navBarHidden: true
      
module.exports = TimelineWindowController