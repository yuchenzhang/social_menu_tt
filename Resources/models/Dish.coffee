class Dish extends Backbone.Model
  urlRoot: Ti.App.endpoint + "/menus"
  id: null
  defaults:
    name: "unknown"
    description: "unknown"
    price: "unknown"
    
  initialize: ->
    super
    
  parse: (data)->
    Ti.API.debug "parsing data dish: " + JSON.stringify(data)
    if data.pictures
      @setPictures(data.pictures)
    {
      name: data.name,
      description: data.description,
      price: data.price
    }
 
  setPictures: (pictures)->
    @pictures ||= new Ti.Model.PictureCollection
    @pictures.reset _.map pictures, (pic)->
        {id: pic.url}
    @pictures.each (pic)->
      Ti.API.debug pic.get 'id'
              
module.exports = Dish 
