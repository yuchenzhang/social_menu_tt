class LoginWindowController
  constructor: ->
    @window = Ti.UI.createWindow
      title: 'login'
      backgroundColor: '#fee'
    
    email = Ti.UI.createTextField
      color: "#336699"
      height: 60
      top: 100
      left: 10
      width: 250
      hintText: "jack@socialmenu.fm"
      keyboardType: Ti.UI.KEYBOARD_EMAIL
      borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
      autocorrect: false
    password = Ti.UI.createTextField
      color: "#336699"
      height: 60
      top: 200
      left: 10
      width: 250
      hintText: "password"
      keyboardType: Ti.UI.KEYBOARD_DEFAULT
      borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
      autocorrect: false
      passwordMask: true
       
    @window.add email
    @window.add password  
module.exports = LoginWindowController     