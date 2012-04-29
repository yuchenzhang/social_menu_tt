(function() {
  var Dish, DishCollection,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Dish = require("models/Dish");

  DishCollection = (function(_super) {

    __extends(DishCollection, _super);

    function DishCollection() {
      DishCollection.__super__.constructor.apply(this, arguments);
    }

    DishCollection.prototype.model = Dish;

    return DishCollection;

  })(Backbone.Collection);

  module.exports = DishCollection;

}).call(this);
