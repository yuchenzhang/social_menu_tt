class Menu extends Backbone.Model
  urlRoot: Ti.App.endpoint + "/menus"
  defaults:
    id: null
    table_number: null
    authentication_token: null
  
  validation:{}
    
  initialize: ->
    super
    Ti.API.debug "Menu created with url: " + @url()
    @restaurant = new Ti.Model.Restaurant
    @dishes = new Ti.Model.DishCollection
    @on "change:id", =>
      return unless @get('id') and @get('authentication_token')
      @fetch
        data: {authentication_token:@get('authentication_token')}
        success: =>
          @trigger "data:refetched"
        error: (model, resp)=>
          Ti.API.error "menu fetch error with " + model.get 'id'
    if @get('id') and @get('authentication_token')
      @fetch
        data: {authentication_token:@get('authentication_token')}
        success: =>
          @trigger "data:refetched"
        error: (model, resp)=>
          Ti.API.error "menu fetch error with " + model.get 'id'
 
  parse: (data)->
    Ti.API.debug "parsing data: " + JSON.stringify(data)
    if data.restaurant
      @restaurant.set @restaurant.parse data.restaurant
      @dishes.reset _.map data.restaurant.dishes, (dish)->
        d = new Dish {
          name:dish.name
          description:dish.description
          price:dish.price
          id: dish.id
        }
        d.setPictures(dish.pictures)
        d
    {
      table_number: data.table_number
    }
                   
module.exports = Menu






