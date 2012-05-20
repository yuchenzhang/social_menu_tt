class Menu extends Backbone.Model
  urlRoot: Ti.App.endpoint + "/menus"
  defaults:
    id: null
    table_number: null
  
  validation:{}
    
  initialize: ->
    super 
    Ti.API.debug "Menu created with url: " + @url()
    @restaurant = new Ti.Model.Restaurant
    @dishes = new Ti.Model.DishCollection
    @on "change:id", =>
      return unless @get('id') and Ti.DB.Util.activeToken()
      @fetch
        data: {authentication_token:Ti.DB.Util.activeToken()}
        success: =>
          @trigger "data:refetched"
        error: (model, resp)=>
          Ti.API.error "menu fetch error with " + model.get 'id'
    if @get('id') and Ti.DB.Util.activeToken()
      @fetch
        data: {authentication_token:Ti.DB.Util.activeToken()}
        success: =>
          @trigger "data:refetched"
        error: (model, resp)=>
          Ti.API.error "menu fetch error with " + model.get 'id'
 
  parse: (data)->
    Ti.API.debug "parsing data: " + JSON.stringify(data)
    if data.restaurant
      try
        @restaurant.set @restaurant.parse data.restaurant
        @dishes.reset _.map data.restaurant.dishes, (dish)->
          d = new Ti.Model.Dish {
            name:dish.name
            price:dish.price
            id: dish.id
            description: dish.description
          }
          d.parseReviews(dish.reviews)
          d
      catch e
        Ti.API.error e
        
    {
      table_number: data.table_number
    }
                   
module.exports = Menu






