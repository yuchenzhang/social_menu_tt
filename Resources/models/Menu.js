(function() {
  var BaseModel, Menu,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseModel = require('models/Base');

  Menu = (function(_super) {

    __extends(Menu, _super);

    function Menu() {
      Menu.__super__.constructor.apply(this, arguments);
    }

    Menu.prototype.urlRoot = Ti.App.endpoint + "/menus";

    Menu.prototype.defaults = {
      id: null,
      table_number: null
    };

    Menu.prototype.validation = {};

    Menu.prototype.initialize = function() {
      var _this = this;
      Menu.__super__.initialize.apply(this, arguments);
      Ti.API.debug("Menu created with url: " + this.url());
      this.restaurant = new Ti.Model.Restaurant;
      this.dishes = new Ti.Model.DishCollection;
      this.on("change:id", function() {
        if (!(_this.attributes.id && Ti.DB.Util.activeToken())) return;
        return _this.fetch({
          data: {
            authentication_token: Ti.DB.Util.activeToken()
          },
          success: function() {
            return _this.trigger("menu:refetched");
          },
          error: function(model, resp) {
            return Ti.API.error("menu fetch error with " + model.attributes.id);
          }
        });
      });
      return this.trigger('change:id');
    };

    Menu.prototype.parse = function(data) {
      Ti.API.debug("parsing menu: " + JSON.stringify(data));
      if (data.restaurant) {
        try {
          this.restaurant.set(this.restaurant.parse(data.restaurant));
          this.dishes.reset(_.map(data.restaurant.dishes, function(dish) {
            var d;
            d = new Ti.Model.Dish({
              name: dish.name,
              price: dish.price,
              id: dish.id,
              description: dish.description
            });
            d.parseReviews(dish.reviews);
            return d;
          }));
        } catch (e) {
          Ti.API.error(e);
        }
      }
      return {
        table_number: data.table_number
      };
    };

    return Menu;

  })(BaseModel);

  module.exports = Menu;

}).call(this);
