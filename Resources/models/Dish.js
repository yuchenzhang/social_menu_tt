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
      name: "unknown",
      description: "unknown",
      price: "unknown"
    };

    Dish.prototype.parse = function(data) {
      Ti.API.debug("parsing data dish: " + JSON.stringify(data));
      return {
        name: data.name,
        description: data.description,
        price: data.price
      };
    };

    return Dish;

  })(Backbone.Model);

  module.exports = Dish;

}).call(this);
