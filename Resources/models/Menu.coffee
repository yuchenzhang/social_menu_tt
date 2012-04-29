class Menu extends Backbone.Model
  urlRoot: Ti.App.endpoint + "/menus"
  id: null
  
  initialize: ->
    super
    Ti.API.debug "Menu created with url: " + @url()
    @table_number = null
    @restaurant = new Ti.Model.Restaurant
    @dishes = new Ti.Model.DishCollection
    @on "change:id", (evt)->
      return unless @get 'id'
      @fetch
        success: =>
          @trigger "data:refetched"
        error: (model, resp, status)=>
          Ti.API.info "fetch error with " + status

 
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






