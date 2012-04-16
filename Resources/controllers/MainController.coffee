Ti.include "lib/underscore.js"
Ti.include "lib/backbone.js"
Ti.include "lib/tiajax.js"

Menu = require "models/Menu"
class MainController
  constructor: ->
    @menu = new Menu()
  
module.exports = MainController