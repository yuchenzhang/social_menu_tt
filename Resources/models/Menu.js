(function() {
  var Menu,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Menu = (function(_super) {

    __extends(Menu, _super);

    function Menu() {
      Menu.__super__.constructor.apply(this, arguments);
    }

    Menu.prototype.urlRoot = Ti.App.endpoint + "/menus";

    Menu.prototype.defaults = {
      id: null,
      table_number: null,
      authentication_token: null
    };

    Menu.prototype.validation = {};

    Menu.prototype.initialize = function() {
      var _this = this;
      Menu.__super__.initialize.apply(this, arguments);
      Ti.API.debug("Menu created with url: " + this.url());
      this.restaurant = new Ti.Model.Restaurant;
      this.dishes = new Ti.Model.DishCollection;
      this.on("change:id", function() {
        if (!(_this.get('id') && _this.get('authentication_token'))) return;
        return _this.fetch({
          data: {
            authentication_token: _this.get('authentication_token')
          },
          success: function() {
            return _this.trigger("data:refetched");
          },
          error: function(model, resp) {
            return Ti.API.error("menu fetch error with " + model.get('id'));
          }
        });
      });
      if (this.get('id') && this.get('authentication_token')) {
        return this.fetch({
          data: {
            authentication_token: this.get('authentication_token')
          },
          success: function() {
            return _this.trigger("data:refetched");
          },
          error: function(model, resp) {
            return Ti.API.error("menu fetch error with " + model.get('id'));
          }
        });
      }
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
