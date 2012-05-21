class LoginWindowController
  constructor: ->
    @user = new Ti.Model.User
    @window = Ti.UI.createWindow
      title: 'login'
      backgroundColor: '#fee'
    @window.add (new Ti.View.UserFormView(@user)).render()
    @window.open()
    @user.on "signIn:success", (user)->
        try
          new Ti.Controller.TabGroup(user) 
        catch error
          Ti.API.error error  
module.exports = LoginWindowController     