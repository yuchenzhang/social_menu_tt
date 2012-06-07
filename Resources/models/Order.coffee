BaseModel = require 'models/Base'
class Order extends BaseModel
  urlRoot: Ti.App.endpoint + "/orders"
  
  defaults:
    id: null
    restaurant_id: null
    user_id: null
    status: null
  
  orderable_dishes: null
  dishes: null
  
  validation:
    id:
      required: false
      pattern: /\d+/
    restaurant_id:
      required: true
      pattern: /\d+/
    user_id:
      required: true
      pattern: /\d+/
    status:
      required: true
      oneOf: ['pending', 'submitted', 'confirmed', 'reopened', 'closed', 'canceled']
  
  initialize: (attrs,dishes)->
    super attrs
    throw new Error 'must assign a valid dish collection' unless dishes instanceof Ti.Model.DishCollection
    @orderable_dishes = dishes
    @orderable_dishes.each (dish)=> 
      dish.on 'change:count', @orderDish      
    @on "change:id", =>
      @sync_id = setInterval (=>@fetch()),5000 if @attributes.id and not Ti.App.test_enabled
    @on "change:status", =>
      if @attributes.status == 'submitted'
        @orderable_dishes.each (dish)->
          dish.set {orderable: false}
        setTimeout (=>@forceConfirm()),5000 unless Ti.App.test_enabled
      if @attributes.status == 'confirmed'
        clearInterval @sync_id if @sync_id
        @dishes.each (dish)->
          dish.reviews.at(0).set {rewritable: true}
  
  forceConfirm: =>
    @set {status: 'confirmed'}
  
  orderDish: (dish)=>
    if dish.attributes.count > 0
      @dishes ||= new Ti.Model.DishCollection
      @dishes.add dish unless @dishes.get dish
    else
      @dishes.remove dish if @dishes.get dish
    @trigger 'change:dishes'
               
  totalPrice: ->
    total = 0
    @dishes.each (dish)->
      total += (parseFloat dish.attributes.price) * dish.attributes.count
    return total  
  
  toJSON: ->
    json = {
      id: @attributes.id
      restaurant_id: @attributes.restaurant_id
      user_id: @attributes.user_id
      authentication_token: Ti.DB.Util.activeToken()
      status: @attributes.status
    }
    if @dishes
      json.dishes = @dishes.map (dish)->
        {id:dish.attributes.id, count: dish.attributes.count} 
    return json
  
  parse: (data)->
    Ti.API.debug "parsing order " + JSON.stringify data
    {
      id:data.id
      restaurant_id: data.restaurant.id
      user_id: data.user.id
      status: data.status
    }
        
module.exports = Order  