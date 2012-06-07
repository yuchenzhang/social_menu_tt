BaseModel = require 'models/Base'
class Timeline extends BaseModel
  urlRoot: Ti.App.endpoint + '/timeline/'
  defaults:
    id: null
    
  validation:{}  
  
  initialize: ->
    super
    @reviews = new Ti.Model.ReviewCollection
    setInterval (=>(@fetch())), 5000 unless Ti.App.test_enabled
    
  parse: (data)->
    Ti.API.debug "timeline received:" + JSON.stringify data
    @reviews.reset _.map data.reviews, (re)=>
        return {
          id: re.id
          user_id: re.user.id
          user_name: re.user.name
          user_avatar: re.user.avatar
          dish_id: re.dish.id
          dish_name: re.dish.name
          comment: re.comment
          picture: re.picture
        }
    @trigger 'timeline:refetched'
    return {}
    
module.exports = Timeline   
    
  