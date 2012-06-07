BaseModel = require 'models/Base'
class Review extends BaseModel
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
    rewritable:false
    picture:null
    picture_binary:null
    
  validation:
    id:
      pattern: /\d+/
    user_id:
      pattern: /\d+/
    dish_id:
      required: true
      pattern: /\d+/
    comment:
      required: true
      maxLength: 140
     
   parse: (data)->
     Ti.API.debug "review parse: " + JSON.stringify data
     return {
       id: data.id
       picture: data.picture
       user_id:data.user.id
       user_name: data.user.name
       user_avatar: data.user.avatar
       comment: data.comment
     }
     
   url: ->
     if @attributes.id
       Ti.App.endpoint + '/dishes/' + @attributes.dish_id + '/reviews/' + @attributes.id
     else
       Ti.App.endpoint + '/dishes/' + @attributes.dish_id + '/reviews'
   
   refetch: ->
     @set {id: -1}
     @fetch {
       success: =>
         Ti.API.debug "refetched review " + @attributes.id
         @trigger 'review:refetched'
     }
                          
module.exports = Review      