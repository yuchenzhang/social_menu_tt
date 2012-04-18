(function() {
  var Barcode, HomeWindowController;

  Barcode = require('ti.barcode');

  Barcode.allowRotation = true;

  Barcode.displayedMessage = 'Scan the Social Menu QR code';

  Barcode.useLED = false;

  Barcode.useFrontCamera = false;

  HomeWindowController = (function() {

    function HomeWindowController(menu) {
      var cancel, logoView, overlay, scanCode, title, topView,
        _this = this;
      this.menu = menu;
      this.window = Ti.UI.createWindow({
        title: 'SocialMenu homepage',
        backgroundColor: 'red'
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
      logoView = Ti.UI.createView({
        backgroundImage: "images/olive.jpg",
        backgroundRepeat: false,
        width: 250,
        height: 188,
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
        return Barcode.capture({
          fullscreen: false,
          animate: true,
          overlay: overlay,
          showCancel: false,
          showRectangle: true,
          keepOpen: true
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
    }

    HomeWindowController.prototype.open = function() {
      return this.window.open();
    };

    return HomeWindowController;

  })();

  module.exports = HomeWindowController;

}).call(this);
