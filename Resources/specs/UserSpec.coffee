describe 'User model', ->
  
  user = null
  beforeEach -> 
    user = new Ti.Model.User {name:'jack', email:'jack@socialmenu.fm',password:'password'}
    jasmine.Ajax.useMock()
    
  describe 'attributes', ->
    it 'should have an assigned name', -> 
      expect(user.get 'name').toEqual 'jack'
    it 'should have an assigned email', -> 
      expect(user.get 'email').toEqual 'jack@socialmenu.fm'
    it 'should have an assigned password', ->
      expect(user.get 'password').toEqual 'password'
    it 'should have an avatar by default', -> 
      expect(user.get 'avatar').toEqual 'images/icons/jack.png'
    it 'should have a url', ->
      expect(user.url()).toMatch Backbone.Validation.patterns.url
      
  describe "validations", ->
    it 'should not accept empty name', ->
      expect(user.set {name: ''}).toBeFalsy()
    it 'should accept a name',->
      expect(user.set {name: 'jack'}).toBeTruthy()
    it 'should not accept an empty email', ->
      expect(user.set {email: ''}).toBeFalsy()
    it 'should not accept a email without proper format', ->
      expect(user.set {email: 'thisisnotanemail'}).toBeFalsy()
    it 'should accept a email with proper format', ->
      expect(user.set {email: 'jack@gmail.com'}).toBeTruthy()
    it 'should accept an empty password', ->
      expect(user.set {password: ''}).toBeTruthy()
  
  describe "signIn", ->
    it 'should not allow sign in if validation fails', ->
      spyOn(user, 'isValid').andReturn false
      expect(user.signIn()).toBeFalsy()
    it 'should retrieve the token when succeed in sign in', ->
      spyOn(user, 'isValid').andReturn true
      spyOn(user, 'set')
      user.signIn()
      request = mostRecentAjaxRequest()
      request.response({
        status: 200
        responseText: JSON.stringify({
            id:1
            name:'jack'
            email:'jack@socialmenu.fm'
            avatar:'/system/users/avatars/000/000/001/medium/jack.png?1335375841'
            authentication_token:'pWyfHDKbBuCP8hjtv6ks'
        })
      })
      expect(user.set).toHaveBeenCalledWith({authentication_token:'pWyfHDKbBuCP8hjtv6ks'})
