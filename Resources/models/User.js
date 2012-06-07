(function() {
  var BaseModel, User,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseModel = require('models/Base');

  User = (function(_super) {

    __extends(User, _super);

    function User() {
      User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.urlRoot = Ti.App.endpoint + '/users';

    User.prototype.defaults = {
      id: null,
      name: null,
      email: null,
      password: null,
      avatar: "images/icons/jack.png"
    };

    User.prototype.validation = {
      email: {
        required: true,
        pattern: 'email'
      }
    };

    User.prototype.initialize = function() {
      var _this = this;
      User.__super__.initialize.apply(this, arguments);
      this.on('validated:invalid', function(model, invalid_attrs) {
        Ti.API.error("User model invalid:" + JSON.stringify(invalid_attrs));
        return _.each(invalid_attrs, function(attr) {
          return _this.trigger('invalid:' + attr);
        });
      });
      return this.on('signIn:error', function(model, resp) {
        return Ti.API.error("sign in error");
      });
    };

    User.prototype.signIn = function(opts) {
      var options,
        _this = this;
      if (opts) this.set(opts);
      Ti.API.debug("sign in with " + JSON.stringify(this));
      if (!this.isValid(true)) return false;
      options = {
        url: this.url() + '/sign_in.json',
        contentType: 'application/json',
        data: JSON.stringify({
          user: {
            email: this.attributes.email,
            password: this.attributes.password
          }
        }),
        success: function(resp, status, xhr) {
          Ti.API.debug('sign in succeeded with resp: ' + JSON.stringify(resp));
          Ti.DB.Util.insertUser(_this.attributes.name, resp.authentication_token);
          Ti.DB.Util.activateUser(resp.authentication_token);
          _this.set({
            authentication_token: resp.authentication_token,
            avatar: resp.avatar,
            name: resp.name,
            id: resp.id
          });
          return _this.trigger('signIn:success', _this);
        },
        error: function(model, resp) {
          return _this.trigger('signIn:error', _this, resp);
        }
      };
      return (this.sync || Backbone.sync).call(this, 'create', this, options);
    };

    return User;

  })(BaseModel);

  module.exports = User;

}).call(this);
