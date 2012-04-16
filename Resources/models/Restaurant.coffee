class Restaurant extends Backbone.Model
  defaults:
    name:     "unknown"
    latitude: "unknown"
    longitude:"unknown"
    address_line_1: "unknown"
    address_line_2: "unknown"
    city: "unknown"
  
  parse: (data)->
    Ti.API.debug "parsing data restaurant: " + JSON.stringify(data)
    {
      name: data.name
      latitude: data.latitude
      longitude:data.longitude
      address_line_1: data.address_line_1
      address_line_2: data.address_line_2
      city: data.city
    }
      
module.exports = Restaurant  
  
