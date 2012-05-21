BaseView = require 'views/BaseView'
class UserFormView extends BaseView
  events:
    'invalid:email': 'emailError'
    'signIn:error': 'signInError'
  view:null
  email_field:null
  password_field:null
  login_btn:null  
  render: ->
    @view = Ti.UI.createView
      width: 250
      height: 'auto'
      layout: 'vertical'
    @email_field = Ti.UI.createTextField
      color: "#336699"
      height: 60
      top: 0
      width: 250
      hintText: "jack@socialmenu.fm"
      value: "jack@socialmenu.fm"
      keyboardType: Ti.UI.KEYBOARD_EMAIL
      borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
      autocorrect: false
    @password_field = Ti.UI.createTextField
      color: "#336699"
      height: 60
      top: 10
      width: 250
      hintText: "password"
      value: "password"
      keyboardType: Ti.UI.KEYBOARD_DEFAULT
      borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
      autocorrect: false
      passwordMask: true
    @login_btn = Ti.UI.createButton
      title: 'sign in'
      top: 10
      width: 250
      height: 60
      text: 'sign in'
    @login_btn.addEventListener 'click', =>
      @model.signIn({email:@email_field.getValue(),password:@password_field.getValue()})
    @error_msg = Ti.UI.createLabel
      color: '#f00'
      font: {fontSize: 14, fontStyle:'italic', fontWeight: 'bold'}
      textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
      width: 250
      height: 'auto'
      top: 2   
    @view.add @email_field
    @view.add @password_field
    @view.add @login_btn
    @view.add @error_msg
    return @view
  
  emailError: =>
    @email_field.borderColor = '#f00'
    @error_msg.text = 'Please fill in a proper email'
  
  signInError: =>
    @error_msg.text = 'Please fill in the right email and password'
    
module.exports = UserFormView
