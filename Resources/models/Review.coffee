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
      maxLength: 140
   
   initialize: ->
     super
     @bind 'validated:invalid', (model,attrs,error)->
       Ti.API.error error + ' ' + JSON.stringify model
   
   parse: (data)->
     Ti.API.debug "review fetched: " + JSON.stringify data
     return {
       id: data.id
       picture: data.picture
       user_id:data.user.id
       user_name: data.user.name
       user_avatar: data.user.avatar
       comment: data.comment
     }
          
   picture_url: ->
     if @attributes.picture
      if @attributes.picture.match /file:\/\//
        return @attributes.picture
      else
        return Ti.App.endpoint + @attributes.picture
     else
      null
     
   url: ->
     if @attributes.id
      Ti.App.endpoint + '/dishes/' + @attributes.dish_id + '/reviews/' + @attributes.id
     else
      Ti.App.endpoint + '/dishes/' + @attributes.dish_id + '/reviews'
   
   refetch: ->
     @set {id: -1}
     @fetch({
       success: =>
         Ti.API.debug "refetched review " + @attributes.id
         @trigger 'refetched'
     })
                          
module.exports = Review      