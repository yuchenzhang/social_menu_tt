describe 'Picture model', ->
  picture = null
  beforeEach ->
    picture = new Ti.Model.Picture
  
  describe 'default attribute', ->
    it 'should have a default id', ->
      expect(picture.get 'id').toBeDefined()
    it 'should have a url', ->
      expect(picture.url()).toMatch Backbone.Validation.patterns.url
  
  describe 'validation', ->
    it 'should not accept blank id', ->
      expect(picture.set {id: ''}).toBeFalsy()
