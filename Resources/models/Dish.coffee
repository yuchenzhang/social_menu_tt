class Dish extends Backbone.Model
  defaults:
    id: null   
    name: null
    price: null
    description: null
    count: 0
  
  validation:
    id:
      required: true
      pattern: /\d+/
    name:
      required: true
    price:
      required: true
      pattern: 'number'
    count:
      required: true
      pattern: /\d+/
      min: 0

  parse: (data)->
    Ti.API.debug "parsing data dish: " + JSON.stringify(data)
    if data.reviews
      @parseReviews(data.reviews)
    {
      name: data.name,
      description: data.description,
      price: data.price
    }
 
  parseReviews: (reviews)->
    @reviews ||= new Ti.Model.ReviewCollection
    @reviews.reset _.map reviews, (re)=>
        {
          id: re.id
          user_id: re.user.id
          user_name: re.user.name
          user_avatar: Ti.App.endpoint + re.user.avatar
          dish_id: @attributes.id
          dish_name: @attributes.name
          dish_price: @attributes.price
          dish_description: @attributes.description
          comment: re.comment
          picture: re.picture
        }
  
  minus: ->
    @set {count: @attributes.count - 1}
 
  plus: ->
    @set {count: @attributes.count + 1}
    
  isOrdered: ->
    return @attributes.count > 0
                 
module.exports = Dish 
