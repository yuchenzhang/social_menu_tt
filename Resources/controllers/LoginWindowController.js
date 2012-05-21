(function() {
  var LoginWindowController;

  LoginWindowController = (function() {

    function LoginWindowController() {
      this.user = new Ti.Model.User;
      this.window = Ti.UI.createWindow({
        title: 'login',
        backgroundColor: '#fee'
      });
      this.window.add((new Ti.View.UserFormView(this.user)).render());
      this.window.open();
      this.user.on("signIn:success", function(user) {
        try {
          return new Ti.Controller.TabGroup(user);
        } catch (error) {
          return Ti.API.error(error);
        }
      });
    }

    return LoginWindowController;

  })();

  module.exports = LoginWindowController;

}).call(this);
