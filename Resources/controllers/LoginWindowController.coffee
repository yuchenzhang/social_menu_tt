class LoginWindowController
  constructor: ->
    Ti.API.debug 'construct login window'
    @window = Ti.UI.createWindow
      title: 'login'
      backgroundColor: '#fee'
    email = Ti.UI.createTextField
      color: "#336699"
      height: 60
      top: 100
      width: 250
      hintText: "jack@socialmenu.fm"
      value: "jack@socialmenu.fm"
      keyboardType: Ti.UI.KEYBOARD_EMAIL
      borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
      autocorrect: false
    password = Ti.UI.createTextField
      color: "#336699"
      height: 60
      top: 200
      width: 250
      hintText: "password"
      value: "password"
      keyboardType: Ti.UI.KEYBOARD_DEFAULT
      borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
      autocorrect: false
      passwordMask: true
    login = Ti.UI.createButton
      title: 'sign in'
      top: 300
      width: 250
      height: 60
      text: 'sign in'
    login.addEventListener 'click', ->
      user = new Ti.Model.User {name:'You', email:email.getValue(), password:password.getValue()}
      Ti.API.debug "created user instance " + JSON.stringify user
      user.on "change:authentication_token", (user)->
        try
          new Ti.Controller.TabGroup(user) 
        catch error
          Ti.API.error error
      user.signIn()
        
    @window.add email
    @window.add password
    @window.add login
    @window.open()  
module.exports = LoginWindowController     