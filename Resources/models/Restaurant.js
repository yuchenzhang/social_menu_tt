(function() {
  var Restaurant,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Restaurant = (function(_super) {

    __extends(Restaurant, _super);

    function Restaurant() {
      Restaurant.__super__.constructor.apply(this, arguments);
    }

    Restaurant.prototype.defaults = {
      name: null,
      latitude: null,
      longitude: null,
      address_line_1: null,
      city: null
    };

    Restaurant.prototype.validation = {
      name: {
        required: true
      },
      latitude: {
        required: true,
        pattern: 'number'
      },
      longitude: {
        required: true,
        pattern: 'number'
      },
      address_line_1: {
        required: true
      },
      city: {
        required: true
      }
    };

    Restaurant.prototype.parse = function(data) {
      Ti.API.debug("parsing data restaurant: " + JSON.stringify(data));
      return {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        address_line_1: data.address_line_1,
        address_line_2: data.address_line_2,
        city: data.city,
        id: data.id
      };
    };

    return Restaurant;

  })(Backbone.Model);

  module.exports = Restaurant;

}).call(this);
