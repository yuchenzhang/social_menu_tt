(function() {
  var BaseModel, Order,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseModel = require('models/Base');

  Order = (function(_super) {

    __extends(Order, _super);

    function Order() {
      this.orderDish = __bind(this.orderDish, this);
      this.forceConfirm = __bind(this.forceConfirm, this);
      Order.__super__.constructor.apply(this, arguments);
    }

    Order.prototype.urlRoot = Ti.App.endpoint + "/orders";

    Order.prototype.defaults = {
      id: null,
      restaurant_id: null,
      user_id: null,
      status: null
    };

    Order.prototype.orderable_dishes = null;

    Order.prototype.dishes = null;

    Order.prototype.validation = {
      id: {
        required: false,
        pattern: /\d+/
      },
      restaurant_id: {
        required: true,
        pattern: /\d+/
      },
      user_id: {
        required: true,
        pattern: /\d+/
      },
      status: {
        required: true,
        oneOf: ['pending', 'submitted', 'confirmed', 'reopened', 'closed', 'canceled']
      }
    };

    Order.prototype.initialize = function(attrs, dishes) {
      var _this = this;
      Order.__super__.initialize.call(this, attrs);
      if (!(dishes instanceof Ti.Model.DishCollection)) {
        throw new Error('must assign a valid dish collection');
      }
      this.orderable_dishes = dishes;
      this.orderable_dishes.each(function(dish) {
        return dish.on('change:count', _this.orderDish);
      });
      this.on("change:id", function() {
        if (_this.attributes.id && !Ti.App.test_enabled) {
          return _this.sync_id = setInterval((function() {
            return _this.fetch();
          }), 5000);
        }
      });
      return this.on("change:status", function() {
        if (_this.attributes.status === 'submitted') {
          _this.orderable_dishes.each(function(dish) {
            return dish.set({
              orderable: false
            });
          });
          if (!Ti.App.test_enabled) {
            setTimeout((function() {
              return _this.forceConfirm();
            }), 5000);
          }
        }
        if (_this.attributes.status === 'confirmed') {
          if (_this.sync_id) clearInterval(_this.sync_id);
          return _this.dishes.each(function(dish) {
            return dish.reviews.at(0).set({
              rewritable: true
            });
          });
        }
      });
    };

    Order.prototype.forceConfirm = function() {
      return this.set({
        status: 'confirmed'
      });
    };

    Order.prototype.orderDish = function(dish) {
      if (dish.attributes.count > 0) {
        this.dishes || (this.dishes = new Ti.Model.DishCollection);
        if (!this.dishes.get(dish)) this.dishes.add(dish);
      } else {
        if (this.dishes.get(dish)) this.dishes.remove(dish);
      }
      return this.trigger('change:dishes');
    };

    Order.prototype.totalPrice = function() {
      var total;
      total = 0;
      this.dishes.each(function(dish) {
        return total += (parseFloat(dish.attributes.price)) * dish.attributes.count;
      });
      return total;
    };

    Order.prototype.toJSON = function() {
      var json;
      json = {
        id: this.attributes.id,
        restaurant_id: this.attributes.restaurant_id,
        user_id: this.attributes.user_id,
        authentication_token: Ti.DB.Util.activeToken(),
        status: this.attributes.status
      };
      if (this.dishes) {
        json.dishes = this.dishes.map(function(dish) {
          return {
            id: dish.attributes.id,
            count: dish.attributes.count
          };
        });
      }
      return json;
    };

    Order.prototype.parse = function(data) {
      Ti.API.debug("parsing order " + JSON.stringify(data));
      return {
        id: data.id,
        restaurant_id: data.restaurant.id,
        user_id: data.user.id,
        status: data.status
      };
    };

    return Order;

  })(BaseModel);

  module.exports = Order;

}).call(this);
