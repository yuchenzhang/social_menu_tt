class Order extends Backbone.Model
  urlRoot: Ti.App.endpoint + "/orders"
  
  defaults:
    id: null
    restaurant_id: null
    user_id: null
  
  validation:
    id:
      required: false
      pattern: /\d+/
    retaurant_id:
      required: true
      pattern: /\d+/
    user_id:
      required: true
      pattern: /\d+/
  
  addDish: (dish)->
    throw "Order adding a dish with not recognized type" unless dish instanceof Ti.Model.Dish
    @dishes ||= new Ti.Model.DishCollection
    @dishes.add dish
  
  removeDish: (dish)->
    throw "Order adding a dish with not recognized type" unless dish instanceof Ti.Model.Dish
    @dishes.remove dish
    
  toJSON: ->
    json = {
      id: @get 'id'
      restaurant_id: @get 'restaurant_id'
      user_id: @get 'user_id'
    }
    if @dishes
      json.dishes = @dishes.map (dish)->
        {id:dish.get 'id'} 
    return json
    
module.exports = Order  