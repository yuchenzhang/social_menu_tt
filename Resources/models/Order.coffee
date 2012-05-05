class Order extends Backbone.Model
  urlRoot: Ti.App.endpoint + "/orders"
  
  defaults:
    id: null
    restaurant_id: null
    user_id: null
    status: null
  
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
    status:
      required: false
      oneOf: ['pending', 'submitted', 'confirmed', 'reopened', 'closed', 'canceled']
  
  initialize: (attrs)->
    super attrs
    Ti.API.debug "order created:" + JSON.stringify @toJSON()
        
  addDish: (dish)->
    throw "Order adding a dish with not recognized type" unless dish instanceof Ti.Model.Dish
    @dishes ||= new Ti.Model.DishCollection
    if dish.get('count') > 0 
      count = dish.get 'count'
      dish.set {count:count + 1}
    else
      @dishes.add dish
      dish.set {count:1}
    @trigger 'change_dish:'+dish.id
  
  removeDish: (dish)->
    throw "Order adding a dish with not recognized type" unless dish instanceof Ti.Model.Dish
    if dish.get('count') == 1
      dish.set {count: 0}
      @dishes.remove dish
    else
      count =  dish.get 'count'
      dish.set {count: count - 1}
    @trigger 'change_dish:'+dish.id
  
  totalPrice: ->
    total = 0
    @dishes.each (dish)->
      total += (parseFloat dish.get 'price') * dish.get('count')
    return total  
  
  toJSON: ->
    json = {
      id: @get 'id'
      restaurant_id: @get 'restaurant_id'
      user_id: @get 'user_id'
      authentication_token: @get 'authentication_token'
    }
    if @dishes
      json.dishes = @dishes.map (dish)->
        {id:dish.get('id'), count: dish.get('count')} 
    return json
  
  parse: (data)->
    Ti.API.debug "parsing order " + JSON.stringify data
    if data.dishes
      @dishes ||= new Ti.Model.DishCollection
      @dishes.reset _.map data.dishes, (dish)->
        new Ti.Model.Dish {id:dish.id,name:dish.name,price:dish.price}
    Ti.API.debug "dishes added"
    {
      id:data.id
      restaurant_id:data.restaurant.id
      user_id:data.host.id
      status: data.status
    }    
module.exports = Order  