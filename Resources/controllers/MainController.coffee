Ti.include "lib/underscore.js"
Ti.include "lib/backbone.js"
Ti.include "lib/tiajax.js"

Menu = require "models/Menu"
HomeWindowController = require "controllers/HomeWindowController"
MenuWindowController = require "controllers/MenuWindowController"
class MainController
  constructor: ->
    @menu = new Menu()
    @homeWindow = new HomeWindowController(@menu).open()
    @menuWindow = new MenuWindowController(@menu)
      
module.exports = MainController