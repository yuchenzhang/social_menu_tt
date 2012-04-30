describe 'Dish model', ->
  dish = null
  beforeEach ->
    dish = new Ti.Model.Dish
  
  describe 'default attributes', ->
    it 'should have a default id', ->
      expect(dish.get 'id').toBeDefined()
    it 'should have a default name', ->
      expect(dish.get 'name').toBeDefined()
    it 'should have a default price', ->
      expect(dish.get 'price').toBeDefined()
    it 'should not have its picture collection defined by default', ->
      expect(dish.pictures).toBeUndefined()
  
  describe 'validations', ->
    it 'should not accept a invalid id', ->
      expect(dish.set {id:'abc'}).toBeFalsy()
    it 'should not accept a null id', ->
      expect(dish.set {id: null}).toBeFalsy()
    it 'should not accept a null name', ->
      expect(dish.set {name: null}).toBeFalsy()
    it 'should not accept a null price', ->
      expect(dish.set {price: null}).toBeFalsy()
    it 'should not accept a invalid price', ->
      expect(dish.set {price: 'abc'}).toBeFalsy()
 
  describe 'set pictures', ->
    it 'should (re)set the picture collection', ->
      pictures = [
        {url:'images/1'},{url:'images/2'}
      ]
      dish.setPictures pictures
      expect(dish.pictures.size()).toEqual 2
      expect(dish.pictures.at(0).get 'id').toEqual 'images/1'
