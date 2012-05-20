class MessageWindowController
  constructor: (user)->
    @window = Ti.UI.createWindow
      backgroundColor: "#fee"
      titleid: "message_window"
      navBarHidden: true
      
module.exports = MessageWindowController