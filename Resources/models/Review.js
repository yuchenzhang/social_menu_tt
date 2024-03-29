(function() {
  var BaseModel, Review,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseModel = require('models/Base');

  Review = (function(_super) {

    __extends(Review, _super);

    function Review() {
      Review.__super__.constructor.apply(this, arguments);
    }

    Review.prototype.defaults = {
      id: null,
      user_id: null,
      user_name: null,
      user_avatar: null,
      dish_id: null,
      dish_name: null,
      dish_price: null,
      dish_description: null,
      comment: null,
      rewritable: false,
      picture: null,
      picture_binary: null
    };

    Review.prototype.validation = {
      id: {
        pattern: /\d+/
      },
      user_id: {
        pattern: /\d+/
      },
      dish_id: {
        required: true,
        pattern: /\d+/
      },
      comment: {
        required: true,
        maxLength: 140
      }
    };

    Review.prototype.parse = function(data) {
      Ti.API.debug("review parse: " + JSON.stringify(data));
      return {
        id: data.id,
        picture: data.picture,
        user_id: data.user.id,
        user_name: data.user.name,
        user_avatar: data.user.avatar,
        comment: data.comment
      };
    };

    Review.prototype.url = function() {
      if (this.attributes.id) {
        return Ti.App.endpoint + '/dishes/' + this.attributes.dish_id + '/reviews/' + this.attributes.id;
      } else {
        return Ti.App.endpoint + '/dishes/' + this.attributes.dish_id + '/reviews';
      }
    };

    Review.prototype.refetch = function() {
      var _this = this;
      this.set({
        id: -1
      });
      return this.fetch({
        success: function() {
          Ti.API.debug("refetched review " + _this.attributes.id);
          return _this.trigger('review:refetched');
        }
      });
    };

    return Review;

  })(BaseModel);

  module.exports = Review;

}).call(this);
