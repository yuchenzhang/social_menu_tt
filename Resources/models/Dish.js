(function() {
  var Dish,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Dish = (function(_super) {

    __extends(Dish, _super);

    function Dish() {
      Dish.__super__.constructor.apply(this, arguments);
    }

    Dish.prototype.defaults = {
      id: null,
      name: null,
      price: null,
      count: 0
    };

    Dish.prototype.validation = {
      id: {
        required: true,
        pattern: /\d+/
      },
      name: {
        required: true
      },
      price: {
        required: true,
        pattern: 'number'
      },
      count: {
        required: true,
        pattern: /\d+/,
        min: 0
      }
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
      this.pictures || (this.pictures = new Ti.Model.PictureCollection);
      return this.pictures.reset(_.map(pictures, function(pic) {
        return {
          id: pic.url
        };
      }));
    };

    return Dish;

  })(Backbone.Model);

  module.exports = Dish;

}).call(this);
