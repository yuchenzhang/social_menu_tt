class Dish extends Backbone.Model
  defaults:
    name: "unknown"
    description: "unknown"
    price: "unknown"
    
  parse: (data)->
    Ti.API.debug "parsing data dish: " + JSON.stringify(data)
    {
      name: data.name
      description: data.description
      price: data.price
    }
      
module.exports = Dish 
