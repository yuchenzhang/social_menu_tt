(function() {
  var Review,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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
      rewritable: false
    };

    Review.prototype.validation = {
      id: {
        required: false,
        pattern: /\d+/
      },
      user_id: {
        required: true,
        pattern: /\d+/
      },
      dish_id: {
        required: true,
        pattern: /\d+/
      },
      comment: {
        required: false,
        maxLength: 140
      }
    };

    Review.prototype.picture_url = function() {
      if (this.attributes.picture) {
        return Ti.App.endpoint + this.attributes.picture;
      } else {
        return null;
      }
    };

    Review.prototype.url = function() {
      if (this.attributes.id) {
        return Ti.App.endpoint + '/dishes/' + this.attributes.dish_id + '/reviews/' + this.attributes.id;
      } else {
        return Ti.App.endpoint + '/dishes/' + this.attributes.dish_id + '/reviews';
      }
    };

    Review.prototype.save = function() {
      if (!(this.attributes.id || this.attributes.picture_binary)) {
        throw "picture_binary is not set!!!";
      } else {
        return Review.__super__.save.apply(this, arguments);
      }
    };

    return Review;

  })(Backbone.Model);

  module.exports = Review;

}).call(this);
