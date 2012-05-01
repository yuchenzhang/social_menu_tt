class Dish extends Backbone.Model
  defaults:
    id: null   
    name: null
    price: null
  
  validation:
    id:
      required: true
      pattern: /\d+/
    name:
      required: true
    price:
      required: true
      pattern: 'number'

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
              
module.exports = Dish 
