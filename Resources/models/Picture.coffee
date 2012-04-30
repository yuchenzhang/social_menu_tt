class Picture extends Backbone.Model
  urlRoot: Ti.App.endpoint
  defaults:
    id: null
  validation:
    id:
      required: true       
module.exports = Picture 