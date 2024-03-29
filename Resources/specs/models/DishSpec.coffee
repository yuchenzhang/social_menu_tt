describe 'Dish model', ->
  dish = null
  beforeEach ->
    dish = new Ti.Model.Dish
  
  describe 'attributes', ->
    it 'should have its count defined as zero by default', ->
      expect(dish.attributes.count).toEqual 0
    it 'should by default is orderable', ->
      expect(dish.attributes.orderable).toEqual true
  
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
    it 'should not accept a invalid count', ->
      expect(dish.set {count: 'abc'}).toBeFalsy()
    it 'should not accept a minus count', ->
      expect(dish.set {count:-1}).toBeFalsy()
 
  describe 'parse', ->
    it 'should (re)set the review collection and return the dish attributes', ->
      data = {
        name: 'bla'
        price: 1
        description: 'blabla'
        reviews: [
          {id:1,comment:'blabla',picture:'images/1.png',user:{id:1,name:'jack',avatar:'avatars/jack.png'}},
          {id:2,comment:'blabla',picture:'images/2.png',user:{id:2,name:'rose',avatar:'avatars/rose.png'}},
        ]
      }
      attributes = {
        name: 'bla'
        price: 1
        description: 'blabla'
      }
      expect(dish.parse data).toEqual attributes
      expect(dish.reviews.length).toEqual 2
      expect(dish.reviews.at(0) instanceof Ti.Model.Review).toBeTruthy()
      expect(dish.reviews.at(0).attributes.picture).toEqual 'images/1.png'
  
