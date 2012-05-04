(function() {
  var LoginWindowController;

  LoginWindowController = (function() {

    function LoginWindowController() {
      var email, login, password;
      Ti.API.debug('construct login window');
      this.window = Ti.UI.createWindow({
        title: 'login',
        backgroundColor: '#fee'
      });
      email = Ti.UI.createTextField({
        color: "#336699",
        height: 60,
        top: 100,
        width: 250,
        hintText: "jack@socialmenu.fm",
        value: "jack@socialmenu.fm",
        keyboardType: Ti.UI.KEYBOARD_EMAIL,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocorrect: false
      });
      password = Ti.UI.createTextField({
        color: "#336699",
        height: 60,
        top: 200,
        width: 250,
        hintText: "password",
        value: "password",
        keyboardType: Ti.UI.KEYBOARD_DEFAULT,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocorrect: false,
        passwordMask: true
      });
      login = Ti.UI.createButton({
        title: 'sign in',
        top: 300,
        width: 250,
        height: 60,
        text: 'sign in'
      });
      login.addEventListener('click', function() {
        var user;
        user = new Ti.Model.User({
          name: 'You',
          email: email.getValue(),
          password: password.getValue()
        });
        Ti.API.debug("created user instance " + JSON.stringify(user));
        user.on("change:authentication_token", function(user) {
          try {
            return new Ti.Controller.TabGroup(user);
          } catch (error) {
            return Ti.API.error(error);
          }
        });
        return user.signIn();
      });
      this.window.add(email);
      this.window.add(password);
      this.window.add(login);
      this.window.open();
    }

    return LoginWindowController;

  })();

  module.exports = LoginWindowController;

}).call(this);
