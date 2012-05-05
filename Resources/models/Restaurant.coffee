class Restaurant extends Backbone.Model
  defaults:
    name:     null
    latitude: null
    longitude: null
    address_line_1: null
    city: null
  
  validation:
    name:
      required: true
    latitude:
      required: true
      pattern: 'number'
    longitude:
      required: true
      pattern: 'number'
    address_line_1:
      required: true
    city:
      required: true
      
  parse: (data)->
    Ti.API.debug "parsing data restaurant: " + JSON.stringify(data)
    {
      name: data.name
      latitude: data.latitude
      longitude:data.longitude
      address_line_1: data.address_line_1
      address_line_2: data.address_line_2
      city: data.city
      id: data.id
    }
      
module.exports = Restaurant  
  
