(function() {
  var BaseView, UserFormView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseView = require('views/BaseView');

  UserFormView = (function(_super) {

    __extends(UserFormView, _super);

    function UserFormView() {
      this.signInError = __bind(this.signInError, this);
      this.emailError = __bind(this.emailError, this);
      UserFormView.__super__.constructor.apply(this, arguments);
    }

    UserFormView.prototype.events = {
      'invalid:email': 'emailError',
      'signIn:error': 'signInError'
    };

    UserFormView.prototype.view = null;

    UserFormView.prototype.email_field = null;

    UserFormView.prototype.password_field = null;

    UserFormView.prototype.login_btn = null;

    UserFormView.prototype.render = function() {
      var _this = this;
      this.view = Ti.UI.createView({
        width: 250,
        height: 'auto',
        layout: 'vertical'
      });
      this.email_field = Ti.UI.createTextField({
        color: "#336699",
        height: 60,
        top: 0,
        width: 250,
        hintText: "jack@socialmenu.fm",
        value: "jack@socialmenu.fm",
        keyboardType: Ti.UI.KEYBOARD_EMAIL,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocorrect: false
      });
      this.password_field = Ti.UI.createTextField({
        color: "#336699",
        height: 60,
        top: 10,
        width: 250,
        hintText: "password",
        value: "password",
        keyboardType: Ti.UI.KEYBOARD_DEFAULT,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocorrect: false,
        passwordMask: true
      });
      this.login_btn = Ti.UI.createButton({
        title: 'sign in',
        top: 10,
        width: 250,
        height: 60,
        text: 'sign in'
      });
      this.login_btn.addEventListener('click', function() {
        return _this.model.signIn({
          email: _this.email_field.getValue(),
          password: _this.password_field.getValue()
        });
      });
      this.error_msg = Ti.UI.createLabel({
        color: '#f00',
        font: {
          fontSize: 14,
          fontStyle: 'italic',
          fontWeight: 'bold'
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: 250,
        height: 'auto',
        top: 2
      });
      this.view.add(this.email_field);
      this.view.add(this.password_field);
      this.view.add(this.login_btn);
      this.view.add(this.error_msg);
      return this.view;
    };

    UserFormView.prototype.emailError = function() {
      this.email_field.borderColor = '#f00';
      return this.error_msg.text = 'Please fill in a proper email';
    };

    UserFormView.prototype.signInError = function() {
      return this.error_msg.text = 'Please fill in the right email and password';
    };

    return UserFormView;

  })(BaseView);

  module.exports = UserFormView;

}).call(this);
