Picture = require 'models/Picture'

class PictureCollection extends Backbone.Collection
  model: Picture

module.exports = PictureCollection 