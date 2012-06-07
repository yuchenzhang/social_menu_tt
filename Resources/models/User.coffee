BaseModel = require 'models/Base'
class User extends BaseModel
  urlRoot: Ti.App.endpoint + '/users'
  defaults:
    id:null
    name:null
    email:null
    password:null
    avatar: "images/icons/jack.png"
    
  validation:
    email:
      required: true
      pattern: 'email'
  
  initialize: ->
    super
    @on 'validated:invalid', (model,invalid_attrs)=>
      Ti.API.error "User model invalid:" + JSON.stringify invalid_attrs
      _.each invalid_attrs, (attr)=>
        @trigger 'invalid:' + attr
    @on 'signIn:error', (model,resp)=>
      Ti.API.error "sign in error"      
        
  signIn: (opts)->
    @set opts if opts
    Ti.API.debug "sign in with " + JSON.stringify(@)
    return false unless @isValid(true)
    options = 
      url: @url() + '/sign_in.json'
      contentType: 'application/json'
      data: JSON.stringify {user:{email:@attributes.email,password:@attributes.password}}
      success: (resp,status,xhr)=>
        Ti.API.debug 'sign in succeeded with resp: ' + JSON.stringify(resp)
        Ti.DB.Util.insertUser @attributes.name, resp.authentication_token
        Ti.DB.Util.activateUser resp.authentication_token
        @set {authentication_token: resp.authentication_token, avatar: resp.avatar, name: resp.name, id:resp.id}
        @trigger 'signIn:success', @
      error: (model,resp)=>
        @trigger 'signIn:error', @, resp
    return (this.sync || Backbone.sync).call(this, 'create', this, options)  
      
module.exports = User  