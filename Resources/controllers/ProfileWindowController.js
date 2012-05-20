(function() {
  var ProfileWindowController;

  ProfileWindowController = (function() {

    function ProfileWindowController(user) {
      this.window = Ti.UI.createWindow({
        backgroundColor: "#000",
        titleid: "profile_window",
        navBarHidden: true
      });
    }

    return ProfileWindowController;

  })();

  module.exports = ProfileWindowController;

}).call(this);
