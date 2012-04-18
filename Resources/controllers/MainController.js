(function() {
  var HomeWindowController, MainController, Menu, MenuWindowController;

  Ti.include("lib/underscore.js");

  Ti.include("lib/backbone.js");

  Ti.include("lib/tiajax.js");

  Menu = require("models/Menu");

  HomeWindowController = require("controllers/HomeWindowController");

  MenuWindowController = require("controllers/MenuWindowController");

  MainController = (function() {

    function MainController() {
      this.menu = new Menu();
      this.homeWindow = new HomeWindowController(this.menu).open();
      this.menuWindow = new MenuWindowController(this.menu);
    }

    return MainController;

  })();

  module.exports = MainController;

}).call(this);
