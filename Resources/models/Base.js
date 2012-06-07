(function() {
  var BaseModel,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseModel = (function(_super) {

    __extends(BaseModel, _super);

    function BaseModel() {
      BaseModel.__super__.constructor.apply(this, arguments);
    }

    BaseModel.prototype.initialize = function() {
      BaseModel.__super__.initialize.apply(this, arguments);
      if (!Ti.App.test_enabled) {
        return this.bind('validated:invalid', function(model, attrs, error) {
          return Ti.API.error(error + ' ' + JSON.stringify(model));
        });
      }
    };

    return BaseModel;

  })(Backbone.Model);

  module.exports = BaseModel;

}).call(this);
