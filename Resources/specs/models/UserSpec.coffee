describe 'User model', ->
  
  user = null
  beforeEach -> 
    user = new Ti.Model.User {name:'jack', email:'jack@socialmenu.fm',password:'password'}
    jasmine.Ajax.useMock()
    
  describe 'attributes', ->
    it 'should have an avatar by default', -> 
      expect(user.attributes.avatar).toEqual 'images/icons/jack.png'
      
  describe "validations", ->
    it 'should not accept an empty email', ->
      expect(user.set {email: ''}).toBeFalsy()
    it 'should not accept a email without proper format', ->
      expect(user.set {email: 'thisisnotanemail'}).toBeFalsy()
    it 'should accept a email with proper format', ->
      expect(user.set {email: 'jack@gmail.com'}).toBeTruthy()
  
  describe "signIn", ->
    it 'should not allow sign in if validation fails', ->
      spyOn(user, 'isValid').andReturn false
      expect(user.signIn()).toBeFalsy()
    it 'should retrieve the token when success', ->
      signInSuccess = null
      user.on 'signIn:success', =>
        signInSuccess = true
      user.signIn()
      mostRecentAjaxRequest().response {
        status: 200
        responseText: JSON.stringify {
            id:1
            name:'jack'
            email:'jack@socialmenu.fm'
            avatar:'/system/users/avatars/000/000/001/medium/jack.png?1335375841'
            authentication_token:'pWyfHDKbBuCP8hjtv6ks'
        }
      }
      expect(signInSuccess).toEqual true
      expect(user.attributes.authentication_token).toEqual 'pWyfHDKbBuCP8hjtv6ks'
    it 'should not update token and trigger signIn:error when failure', ->
      signInSuccess = null
      user.on 'signIn:error', =>
        signInSuccess = false
      user.signIn()
      mostRecentAjaxRequest().response({
        status: 401
        responseText: JSON.stringify({
            error: "invalid email or password"
        })
      })
      expect(signInSuccess).toEqual false
      expect(user.attributes.authentication_token).toBeUndefined()
