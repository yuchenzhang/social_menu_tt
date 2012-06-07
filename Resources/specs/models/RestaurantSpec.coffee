describe 'Restaurant model', ->
  restaurant = null
  beforeEach ->
    restaurant = new Ti.Model.Restaurant
  
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
