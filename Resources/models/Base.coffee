class BaseModel extends Backbone.Model
  initialize: ->
    super
    unless Ti.App.test_enabled
      @bind 'validated:invalid', (model,attrs,error)->
        Ti.API.error error + ' ' + JSON.stringify model

module.exports = BaseModel