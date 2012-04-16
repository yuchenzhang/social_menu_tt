(function() {
  var MainController, Menu;

  Ti.include("lib/underscore.js");

  Ti.include("lib/backbone.js");

  Ti.include("lib/tiajax.js");

  Menu = require("models/Menu");

  MainController = (function() {

    function MainController() {
      this.menu = new Menu();
    }

    return MainController;

  })();

  module.exports = MainController;

}).call(this);
