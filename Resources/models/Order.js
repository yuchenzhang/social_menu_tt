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
      user_id: null,
      status: null
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
      },
      status: {
        required: false,
        oneOf: ['pending', 'submitted', 'confirmed', 'reopened', 'closed', 'canceled']
      }
    };

    Order.prototype.initialize = function(attrs) {
      Order.__super__.initialize.call(this, attrs);
      return Ti.API.debug("order created:" + JSON.stringify(this.toJSON()));
    };

    Order.prototype.addDish = function(dish) {
      var count;
      if (!(dish instanceof Ti.Model.Dish)) {
        throw "Order adding a dish with not recognized type";
      }
      this.dishes || (this.dishes = new Ti.Model.DishCollection);
      if (dish.get('count') > 0) {
        count = dish.get('count');
        dish.set({
          count: count + 1
        });
      } else {
        this.dishes.add(dish);
        dish.set({
          count: 1
        });
      }
      return this.trigger('change_dish:' + dish.id);
    };

    Order.prototype.removeDish = function(dish) {
      var count;
      if (!(dish instanceof Ti.Model.Dish)) {
        throw "Order adding a dish with not recognized type";
      }
      if (dish.get('count') === 1) {
        dish.set({
          count: 0
        });
        this.dishes.remove(dish);
      } else {
        count = dish.get('count');
        dish.set({
          count: count - 1
        });
      }
      return this.trigger('change_dish:' + dish.id);
    };

    Order.prototype.totalPrice = function() {
      var total;
      total = 0;
      this.dishes.each(function(dish) {
        return total += (parseFloat(dish.get('price'))) * dish.get('count');
      });
      return total;
    };

    Order.prototype.toJSON = function() {
      var json;
      json = {
        id: this.get('id'),
        restaurant_id: this.get('restaurant_id'),
        user_id: this.get('user_id'),
        authentication_token: this.get('authentication_token')
      };
      if (this.dishes) {
        json.dishes = this.dishes.map(function(dish) {
          return {
            id: dish.get('id'),
            count: dish.get('count')
          };
        });
      }
      return json;
    };

    Order.prototype.parse = function(data) {
      Ti.API.debug("parsing order " + JSON.stringify(data));
      if (data.dishes) {
        this.dishes || (this.dishes = new Ti.Model.DishCollection);
        this.dishes.reset(_.map(data.dishes, function(dish) {
          return new Ti.Model.Dish({
            id: dish.id,
            name: dish.name,
            price: dish.price
          });
        }));
      }
      Ti.API.debug("dishes added");
      return {
        id: data.id,
        restaurant_id: data.restaurant.id,
        user_id: data.host.id,
        status: data.status
      };
    };

    return Order;

  })(Backbone.Model);

  module.exports = Order;

}).call(this);
