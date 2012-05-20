class Review extends Backbone.Model
  defaults:
    id: null
    user_id: null
    user_name:null
    user_avatar:null
    dish_id: null
    dish_name: null
    dish_price: null
    dish_description:null
    comment: null
  
  validation:
    id:
      required: false
      pattern: /\d+/
    user_id:
      required: true
      pattern: /\d+/
    dish_id:
      required: true
      pattern: /\d+/
    comment:
      required: false
      maxLength: 140
    
   picture_url: ->
     if @attributes.picture
      Ti.App.endpoint + @attributes.picture 
     else
      null
      
   url: ->
     if @attributes.id
      Ti.App.endpoint + '/dishes/' + @attributes.dish_id + '/reviews/' + @attributes.id
     else
      Ti.App.endpoint + '/dishes/' + @attributes.dish_id + '/reviews'
   
   save: ->
     unless @attributes.id or @attributes.picture_binary
      throw "picture_binary is not set!!!" 
     else
      super                     
module.exports = Review      