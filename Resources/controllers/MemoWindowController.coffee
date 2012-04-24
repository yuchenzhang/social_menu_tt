class MemoWindowController
  constructor: (menu)->
    @menu = menu
    @window = Ti.UI.createWindow
      backgroundColor: "#000"
      titleid: "memo_window"
      navBarHidden: true

module.exports = MemoWindowController