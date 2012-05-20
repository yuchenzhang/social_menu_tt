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
    restaurant_id:
      required: true
      pattern: /\d+/
    user_id:
      required: true
      pattern: /\d+/
    status:
      required: true
      oneOf: ['pending', 'submitted', 'confirmed', 'reopened', 'closed', 'canceled']
  
  initialize: ->
    super
    @on "change:id", =>
      setInterval (=>
        @fetch()),5000
           
  addDish: (dish)->
    return if @attributes.status != 'pending'
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
    return if @attributes.status != 'pending'
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
      restaurant_id: @attributes.restaurant_id
      user_id: @attributes.user_id
      authentication_token: Ti.DB.Util.activeToken()
      status: @attributes.status
    }
    if @dishes
      json.dishes = @dishes.map (dish)->
        {id:dish.get('id'), count: dish.get('count')} 
    return json
  
  parse: (data)->
    Ti.API.debug "parsing order " + JSON.stringify data
    {
      id:data.id
      status: data.status
    }    
module.exports = Order  