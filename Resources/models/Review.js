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
        maxLength: 140
      }
    };

    Review.prototype.initialize = function() {
      Review.__super__.initialize.apply(this, arguments);
      return this.bind('validated:invalid', function(model, attrs, error) {
        return Ti.API.error(error + ' ' + JSON.stringify(model));
      });
    };

    Review.prototype.parse = function(data) {
      Ti.API.debug("review fetched: " + JSON.stringify(data));
      return {
        id: data.id,
        picture: data.picture,
        user_id: data.user.id,
        user_name: data.user.name,
        user_avatar: data.user.avatar,
        comment: data.comment
      };
    };

    Review.prototype.picture_url = function() {
      if (this.attributes.picture) {
        if (this.attributes.picture.match(/file:\/\//)) {
          return this.attributes.picture;
        } else {
          return Ti.App.endpoint + this.attributes.picture;
        }
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

    Review.prototype.refetch = function() {
      var _this = this;
      this.set({
        id: -1
      });
      return this.fetch({
        success: function() {
          Ti.API.debug("refetched review " + _this.attributes.id);
          return _this.trigger('refetched');
        }
      });
    };

    return Review;

  })(Backbone.Model);

  module.exports = Review;

}).call(this);
