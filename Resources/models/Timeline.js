(function() {
  var BaseModel, Timeline,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseModel = require('models/Base');

  Timeline = (function(_super) {

    __extends(Timeline, _super);

    function Timeline() {
      Timeline.__super__.constructor.apply(this, arguments);
    }

    Timeline.prototype.urlRoot = Ti.App.endpoint + '/timeline/';

    Timeline.prototype.defaults = {
      id: null
    };

    Timeline.prototype.validation = {};

    Timeline.prototype.initialize = function() {
      var _this = this;
      Timeline.__super__.initialize.apply(this, arguments);
      this.reviews = new Ti.Model.ReviewCollection;
      if (!Ti.App.test_enabled) {
        return setInterval((function() {
          return _this.fetch();
        }), 5000);
      }
    };

    Timeline.prototype.parse = function(data) {
      var _this = this;
      Ti.API.debug("timeline received:" + JSON.stringify(data));
      this.reviews.reset(_.map(data.reviews, function(re) {
        return {
          id: re.id,
          user_id: re.user.id,
          user_name: re.user.name,
          user_avatar: re.user.avatar,
          dish_id: re.dish.id,
          dish_name: re.dish.name,
          comment: re.comment,
          picture: re.picture
        };
      }));
      this.trigger('timeline:refetched');
      return {};
    };

    return Timeline;

  })(BaseModel);

  module.exports = Timeline;

}).call(this);
