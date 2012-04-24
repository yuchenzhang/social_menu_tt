(function() {
  var Dish, PictureCollection,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  PictureCollection = require("models/PictureCollection");

  Dish = (function(_super) {

    __extends(Dish, _super);

    function Dish() {
      Dish.__super__.constructor.apply(this, arguments);
    }

    Dish.prototype.urlRoot = Ti.App.endpoint + "/menus";

    Dish.prototype.id = null;

    Dish.prototype.defaults = {
      name: "unknown",
      description: "unknown",
      price: "unknown"
    };

    Dish.prototype.initialize = function() {
      return Dish.__super__.initialize.apply(this, arguments);
    };

    Dish.prototype.parse = function(data) {
      Ti.API.debug("parsing data dish: " + JSON.stringify(data));
      if (data.pictures) this.setPictures(data.pictures);
      return {
        name: data.name,
        description: data.description,
        price: data.price
      };
    };

    Dish.prototype.setPictures = function(pictures) {
      this.pictures || (this.pictures = new PictureCollection);
      this.pictures.reset(_.map(pictures, function(pic) {
        return {
          id: pic.url
        };
      }));
      return this.pictures.each(function(pic) {
        return Ti.API.debug(pic.get('id'));
      });
    };

    return Dish;

  })(Backbone.Model);

  module.exports = Dish;

}).call(this);
