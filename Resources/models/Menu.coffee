Restaurant = require "models/Restaurant"
DishCollection = require "models/DishCollection"
class Menu extends Backbone.Model
  urlRoot: Ti.App.endpoint + "/menus"
  id: "7b018260-6799-012f-0040-58b035fd32cb"
  
  initialize: ->
    super
    Ti.API.debug "Menu created with url: " + @url()
    @table_number = null
    @restaurant = new Restaurant
    @dishes = new DishCollection
    
    @fetch
      success: (model, resp)=>
        Ti.API.debug "fetch success "
        Ti.API.debug @get "table_number" 
        Ti.API.debug @restaurant.get "name"
        Ti.API.debug @restaurant.get "city"
        Ti.API.debug @dishes.map (dish)->
          dish.get('name')
      error: (model, resp)=>
        Ti.API.info "fetch error with " + resp.status
 
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