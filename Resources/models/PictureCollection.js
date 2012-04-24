(function() {
  var Picture, PictureCollection,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Picture = require('models/Picture');

  PictureCollection = (function(_super) {

    __extends(PictureCollection, _super);

    function PictureCollection() {
      PictureCollection.__super__.constructor.apply(this, arguments);
    }

    PictureCollection.prototype.model = Picture;

    return PictureCollection;

  })(Backbone.Collection);

  module.exports = PictureCollection;

}).call(this);
