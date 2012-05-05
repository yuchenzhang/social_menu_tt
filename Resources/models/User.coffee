class User extends Backbone.Model
  urlRoot: Ti.App.endpoint + '/users'
  defaults:
    avatar: "images/icons/jack.png"
    
  validation:
    name: 
      required: true
      msg: 'Name is required'
    email:
      required: true
      pattern: 'email'
    password:
      required: false
  
  initialize: ->
    super
    @on 'validated:invalid', (model,error,options)=>
      Ti.API.error "User model invalid:" + JSON.stringify error
      # alert "User model invalid:" + JSON.stringify error
    @on 'signIn:error', (model,resp)=>
      Ti.API.debug "sign in error"
      # alert "User model signIn failed:" + JSON.stringify @      
  signIn: ->
    Ti.API.debug "sign in with " + JSON.stringify(@)
    return false unless @isValid(true)
    options = 
      url: @url() + '/sign_in.json'
      contentType: 'application/json'
      data: JSON.stringify {user:{email:@get('email'),password:@get('password')}}
      success: (resp,status,xhr)=>
        Ti.API.debug 'sign in succeeded with resp: ' + JSON.stringify(resp)
        Ti.DB.Util.insertUser @get('name'), resp.authentication_token
        Ti.DB.Util.activateUser resp.authentication_token
        @set {authentication_token: resp.authentication_token, avatar: Ti.App.endpoint + resp.avatar, name: resp.name, id:resp.id}
      error: (model,resp)=>
        @trigger 'signIn:error', @, resp
    return (this.sync || Backbone.sync).call(this, 'create', this, options)  
      
module.exports = User  