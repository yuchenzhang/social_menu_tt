class TrendingWindowController
  constructor: (user)->
    @window = Ti.UI.createWindow
      backgroundColor: "#fee"
      titleid: "trending_window"
      navBarHidden: true
      
module.exports = TrendingWindowController
