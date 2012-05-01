(function() {
  var Order,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Order = (function(_super) {

    __extends(Order, _super);

    function Order() {
      Order.__super__.constructor.apply(this, arguments);
    }

    Order.prototype.urlRoot = Ti.App.endpoint + "/orders";

    Order.prototype.defaults = {
      id: null,
      restaurant_id: null,
      user_id: null
    };

    Order.prototype.validation = {
      id: {
        required: false,
        pattern: /\d+/
      },
      retaurant_id: {
        required: true,
        pattern: /\d+/
      },
      user_id: {
        required: true,
        pattern: /\d+/
      }
    };

    Order.prototype.addDish = function(dish) {
      if (!(dish instanceof Ti.Model.Dish)) {
        throw "Order adding a dish with not recognized type";
      }
      this.dishes || (this.dishes = new Ti.Model.DishCollection);
      return this.dishes.add(dish);
    };

    Order.prototype.removeDish = function(dish) {
      if (!(dish instanceof Ti.Model.Dish)) {
        throw "Order adding a dish with not recognized type";
      }
      return this.dishes.remove(dish);
    };

    Order.prototype.toJSON = function() {
      var json;
      json = {
        id: this.get('id'),
        restaurant_id: this.get('restaurant_id'),
        user_id: this.get('user_id')
      };
      if (this.dishes) {
        json.dishes = this.dishes.map(function(dish) {
          return {
            id: dish.get('id')
          };
        });
      }
      return json;
    };

    return Order;

  })(Backbone.Model);

  module.exports = Order;

}).call(this);
