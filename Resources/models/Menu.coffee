Restaurant = require "models/Restaurant"
DishCollection = require "models/DishCollection"
class Menu extends Backbone.Model
  urlRoot: Ti.App.endpoint + "/menus"
  id: null
  
  initialize: ->
    super
    Ti.API.debug "Menu created with url: " + @url()
    @table_number = null
    @restaurant = new Restaurant
    @dishes = new DishCollection
    @on "change:id", (evt)->
      @fetch
        success: =>
          @trigger "data:refetched"
        error: (model, resp, status)=>
          Ti.API.info "fetch error with " + status

 
  parse: (data)->
    Ti.API.debug "parsing data: " + JSON.stringify(data)
    if data.restaurant
      @restaurant.set @restaurant.parse data.restaurant
      @dishes.reset
      @dishes.add data.restaurant.dishes.map (dish)->
        return {
          name:dish.name
          description:dish.description
          price:dish.price
        } 
    
    {
      table_number: data.table_number
    }
                   
module.exports = Menu






