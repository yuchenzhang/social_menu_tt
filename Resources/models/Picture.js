(function() {
  var Picture,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Picture = (function(_super) {

    __extends(Picture, _super);

    function Picture() {
      Picture.__super__.constructor.apply(this, arguments);
    }

    Picture.prototype.urlRoot = Ti.App.endpoint;

    Picture.prototype.defaults = {
      id: null
    };

    Picture.prototype.validation = {
      id: {
        required: true
      }
    };

    return Picture;

  })(Backbone.Model);

  module.exports = Picture;

}).call(this);
