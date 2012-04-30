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
        
  signIn: ->
    Ti.API.debug "sign in with " + JSON.stringify(@) + " to url " + @url()
    return false unless @isValid(true)
    options = 
      url: @url() + '/sign_in.json'
      contentType: 'application/json'
      data: JSON.stringify {user:{email:@get('email'),password:@get('password')}}
      success: (resp,status,xhr)=>
        Ti.API.debug 'sign in succeeded with resp: ' + JSON.stringify(resp)
        @set {authentication_token: resp.authentication_token}
    return (this.sync || Backbone.sync).call(this, 'create', this, options)  
      
module.exports = User  