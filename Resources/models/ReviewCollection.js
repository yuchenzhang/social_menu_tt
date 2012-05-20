(function() {
  var Review, ReviewCollection,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Review = require("models/Review");

  ReviewCollection = (function(_super) {

    __extends(ReviewCollection, _super);

    function ReviewCollection() {
      ReviewCollection.__super__.constructor.apply(this, arguments);
    }

    ReviewCollection.prototype.model = Review;

    return ReviewCollection;

  })(Backbone.Collection);

  module.exports = ReviewCollection;

}).call(this);
