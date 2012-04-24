(function() {
  var Dish, DishCollection, Menu, Restaurant,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Restaurant = require("models/Restaurant");

  Dish = require("models/Dish");

  DishCollection = require("models/DishCollection");

  Menu = (function(_super) {

    __extends(Menu, _super);

    function Menu() {
      Menu.__super__.constructor.apply(this, arguments);
    }

    Menu.prototype.urlRoot = Ti.App.endpoint + "/menus";

    Menu.prototype.id = null;

    Menu.prototype.initialize = function() {
      Menu.__super__.initialize.apply(this, arguments);
      Ti.API.debug("Menu created with url: " + this.url());
      this.table_number = null;
      this.restaurant = new Restaurant;
      this.dishes = new DishCollection;
      return this.on("change:id", function(evt) {
        var _this = this;
        if (!this.get('id')) return;
        return this.fetch({
          success: function() {
            return _this.trigger("data:refetched");
          },
          error: function(model, resp, status) {
            return Ti.API.info("fetch error with " + status);
          }
        });
      });
    };

    Menu.prototype.parse = function(data) {
      Ti.API.debug("parsing data: " + JSON.stringify(data));
      if (data.restaurant) {
        this.restaurant.set(this.restaurant.parse(data.restaurant));
        this.dishes.reset(_.map(data.restaurant.dishes, function(dish) {
          var d;
          d = new Dish({
            name: dish.name,
            description: dish.description,
            price: dish.price,
            id: dish.id
          });
          d.setPictures(dish.pictures);
          return d;
        }));
      }
      return {
        table_number: data.table_number
      };
    };

    return Menu;

  })(Backbone.Model);

  module.exports = Menu;

}).call(this);
