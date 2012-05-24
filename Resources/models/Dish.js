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
      id: null,
      name: null,
      price: null,
      description: null,
      count: 0,
      orderable: true
    };

    Dish.prototype.validation = {
      id: {
        required: true,
        pattern: /\d+/
      },
      name: {
        required: true
      },
      price: {
        required: true,
        pattern: 'number'
      },
      count: {
        required: true,
        pattern: /\d+/,
        min: 0
      }
    };

    Dish.prototype.parse = function(data) {
      Ti.API.debug("parsing data dish: " + JSON.stringify(data));
      if (data.reviews) this.parseReviews(data.reviews);
      return {
        name: data.name,
        description: data.description,
        price: data.price
      };
    };

    Dish.prototype.parseReviews = function(reviews) {
      var _this = this;
      this.reviews || (this.reviews = new Ti.Model.ReviewCollection);
      return this.reviews.reset(_.map(reviews, function(re) {
        return {
          id: re.id,
          user_id: re.user.id,
          user_name: re.user.name,
          user_avatar: Ti.App.endpoint + re.user.avatar,
          dish_id: _this.attributes.id,
          dish_name: _this.attributes.name,
          dish_price: _this.attributes.price,
          dish_description: _this.attributes.description,
          comment: re.comment,
          picture: re.picture
        };
      }));
    };

    Dish.prototype.minus = function() {
      if (this.attributes.orderable) {
        return this.set({
          count: this.attributes.count - 1
        });
      }
    };

    Dish.prototype.plus = function() {
      if (this.attributes.orderable) {
        return this.set({
          count: this.attributes.count + 1
        });
      }
    };

    Dish.prototype.isOrdered = function() {
      return this.attributes.count > 0;
    };

    return Dish;

  })(Backbone.Model);

  module.exports = Dish;

}).call(this);
