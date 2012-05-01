describe 'Order model', ->
  order = null
  beforeEach ->
    order = new Ti.Model.Order
  
  describe 'save', ->
    it 'should return a cutomized json', ->
      order.set
        restaurant_id: 1
        user_id: 1  
      order.addDish(new Ti.Model.Dish {id:1, name:'cucumber',price:'2.5'})
      order.addDish(new Ti.Model.Dish {id:2, name:'courgette',price:'4.5'})
      order.save()
