describe 'Restaurant model', ->
  restaurant = null
  beforeEach ->
    restaurant = new Ti.Model.Restaurant
    
  describe 'default attributes', ->
    it 'should have a default name', ->
      expect(restaurant.get 'name').toBeDefined()
    it 'should have a default latitude', ->
      expect(restaurant.get 'latitude').toBeDefined()
    it 'should have a default longitude', ->
      expect(restaurant.get 'longitude').toBeDefined()
    it 'should have a default address_line_1', ->
      expect(restaurant.get 'address_line_1').toBeDefined()
    it 'should not have a default address_line_2', ->
      expect(restaurant.get 'address_line_2').toBeUndefined()
    it 'should have a default city', ->
      expect(restaurant.get 'city').toBeDefined()
  
  describe 'validations', ->
    it 'should not accept a blank name', ->
      expect(restaurant.set {name:''}).toBeFalsy()
    it 'should not accept a blank latitude', ->
      expect(restaurant.set {latitude: ''}).toBeFalsy()
    it 'should not accept a non-number value for latitude', ->
      expect(restaurant.set {latitude: 'abc'}).toBeFalsy()
    it 'should not accept a non-number value for longitude', ->
      expect(restaurant.set {longitude: 'abc'}).toBeFalsy()
    it 'should not accept a blank longitude', ->
      expect(restaurant.set {longitude:''}).toBeFalsy()
    it 'should not accept a blank address_line_1', ->
      expect(restaurant.set {address_line_1:""}).toBeFalsy()
    it 'should not accept a blank city', ->
      expect(restaurant.set {city: ''}).toBeFalsy()
