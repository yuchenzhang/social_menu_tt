class ProfileWindowController
  constructor: (user)->
    @window = Ti.UI.createWindow
      backgroundColor: "#000"
      titleid: "profile_window"
      navBarHidden: true

module.exports = ProfileWindowController