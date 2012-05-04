(function() {
  var Barcode, HomeWindowController, MenuWindowController;

  Barcode = require('ti.barcode');

  Barcode.allowRotation = true;

  Barcode.displayedMessage = 'Scan the Social Menu QR code';

  Barcode.useLED = false;

  Barcode.useFrontCamera = false;

  MenuWindowController = require("controllers/MenuWindowController");

  HomeWindowController = (function() {

    function HomeWindowController(menu, user) {
      var cancel, logoView, overlay, scanCode, title, topView,
        _this = this;
      this.menu = menu;
      this.user = user;
      this.window = Ti.UI.createWindow({
        title: 'Homepage',
        backgroundColor: 'red',
        navBarHidden: true
      });
      topView = Ti.UI.createView({
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        top: 2
      });
      title = Ti.UI.createLabel({
        text: "SocialMenu",
        height: 'auto',
        width: 'auto',
        shadowColor: '#aaa',
        color: '#900',
        font: {
          fontSize: 48
        },
        textAlign: 'center'
      });
      topView.add(title);
      this.window.add(topView);
      logoView = Ti.UI.createImageView({
        image: "images/olive.jpg",
        backgroundRepeat: false,
        backgroundTopCap: 0,
        width: 200,
        height: 'auto',
        top: 100
      });
      this.window.add(logoView);
      scanCode = Ti.UI.createButton({
        title: 'Scan Code',
        width: 150,
        height: 60,
        top: 350
      });
      overlay = Ti.UI.createView({
        backgroundColor: 'transparent',
        width: 260,
        height: 260,
        top: 100,
        left: 30
      });
      cancel = Ti.UI.createButton({
        title: 'cancel',
        width: 75,
        height: 30,
        top: 350
      });
      cancel.addEventListener('click', function() {
        return Barcode.cancel();
      });
      overlay.add(cancel);
      scanCode.addEventListener('click', function() {
        return _this.menu.set({
          'id': '646e14e0-6d0f-012f-00d0-58b035fd32cb'
        });
      });
      this.window.add(scanCode);
      Barcode.addEventListener('error', function() {
        return alert('error on scaning');
      });
      Barcode.addEventListener('success', function(e) {
        _this.menu.set({
          'id': e.result
        });
        return Barcode.cancel();
      });
      this.menu.on("data:refetched", function() {
        try {
          return _this.window.containingTab.open((new Ti.Controller.MenuWindow(_this.menu, _this.user)).window, {
            animated: true
          });
        } catch (e) {
          Ti.API.error(e);
          throw e;
        }
      });
    }

    return HomeWindowController;

  })();

  module.exports = HomeWindowController;

}).call(this);
