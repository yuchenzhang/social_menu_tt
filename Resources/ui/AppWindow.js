(function() {
  var AppWindow;

  AppWindow = (function() {

    function AppWindow(title) {
      var button, self;
      self = Ti.UI.createWindow({
        title: title,
        backgroundColor: 'white'
      });
      button = Ti.UI.createButton({
        height: 44,
        width: 200,
        title: L('open window'),
        top: 20
      });
      self.add(button);
      button.addEventListener('click', function() {
        return self.containingTab.open(Ti.UI.createWindow({
          title: L('newWindow'),
          backgroundColor: 'white'
        }));
      });
      return self;
    }

    return AppWindow;

  })();

  module.exports = AppWindow;

}).call(this);
