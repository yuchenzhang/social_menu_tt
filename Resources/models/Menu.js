(function() {
  var DishCollection, Menu, Restaurant,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Restaurant = require("models/Restaurant");

  DishCollection = require("models/DishCollection");

  Menu = (function(_super) {

    __extends(Menu, _super);

    function Menu() {
      Menu.__super__.constructor.apply(this, arguments);
    }

    Menu.prototype.urlRoot = Ti.App.endpoint + "/menus";

    Menu.prototype.id = "7b018260-6799-012f-0040-58b035fd32cb";

    Menu.prototype.initialize = function() {
      var _this = this;
      Menu.__super__.initialize.apply(this, arguments);
      Ti.API.debug("Menu created with url: " + this.url());
      this.table_number = null;
      this.restaurant = new Restaurant;
      this.dishes = new DishCollection;
      return this.fetch({
        success: function(model, resp) {
          Ti.API.debug("fetch success ");
          Ti.API.debug(_this.get("table_number"));
          Ti.API.debug(_this.restaurant.get("name"));
          Ti.API.debug(_this.restaurant.get("city"));
          return Ti.API.debug(_this.dishes.map(function(dish) {
            return dish.get('name');
          }));
        },
        error: function(model, resp) {
          return Ti.API.info("fetch error with " + resp.status);
        }
      });
    };

    Menu.prototype.parse = function(data) {
      Ti.API.debug("parsing data: " + JSON.stringify(data));
      if (data.restaurant) {
        this.restaurant.set(this.restaurant.parse(data.restaurant));
        this.dishes.reset;
        this.dishes.add(data.restaurant.dishes.map(function(dish) {
          return {
            name: dish.name,
            description: dish.description,
            price: dish.price
          };
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
