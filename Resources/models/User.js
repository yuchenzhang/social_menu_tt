(function() {
  var User,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  User = (function(_super) {

    __extends(User, _super);

    function User() {
      User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.urlRoot = Ti.App.endpoint + '/users';

    User.prototype.defaults = {
      avatar: "images/icons/jack.png"
    };

    User.prototype.validation = {
      name: {
        required: true,
        msg: 'Name is required'
      },
      email: {
        required: true,
        pattern: 'email'
      },
      password: {
        required: false
      }
    };

    User.prototype.signIn = function() {
      var options,
        _this = this;
      Ti.API.debug("sign in with " + JSON.stringify(this) + " to url " + this.url());
      if (!this.isValid(true)) return false;
      options = {
        url: this.url() + '/sign_in.json',
        contentType: 'application/json',
        data: JSON.stringify({
          user: {
            email: this.get('email'),
            password: this.get('password')
          }
        }),
        success: function(resp, status, xhr) {
          Ti.API.debug('sign in succeeded with resp: ' + JSON.stringify(resp));
          return _this.set({
            authentication_token: resp.authentication_token
          });
        }
      };
      return (this.sync || Backbone.sync).call(this, 'create', this, options);
    };

    return User;

  })(Backbone.Model);

  module.exports = User;

}).call(this);
