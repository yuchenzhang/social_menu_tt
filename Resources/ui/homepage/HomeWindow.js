(function() {
  var Barcode, HomeWindow, MenuWindow;

  Barcode = require('ti.barcode');

  Barcode.allowRotation = true;

  Barcode.displayedMessage = 'Scan the Social Menu QR code';

  Barcode.useLED = true;

  Barcode.useFrontCamera = false;

  MenuWindow = require("ui/menu/MenuWindow");

  HomeWindow = (function() {

    function HomeWindow() {
      var overlay, scanCode, scrollView, self;
      self = Ti.UI.createWindow({
        title: 'SocialMenu homepage',
        backgroundColor: 'white'
      });
      scrollView = Ti.UI.createScrollView({
        contentWidth: 'auto',
        contentHeight: 'auto',
        top: 0,
        showVerticalScrollIndicator: true,
        layout: 'vertical'
      });
      scanCode = Ti.UI.createButton({
        title: 'Scan Code',
        width: 150,
        height: 60,
        top: 20
      });
      overlay = Ti.UI.createView({
        backgroundColor: 'transparent',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      });
      scanCode.addEventListener('click', function() {
        var uuid;
        uuid = "7b018260-6799-012f-0040-58b035fd32cb";
        return (new MenuWindow(uuid)).open();
      });
      scrollView.add(scanCode);
      self.add(scrollView);
      Barcode.addEventListener('error', function() {
        return alert('error on scaning');
      });
      Barcode.addEventListener('success', function(e) {
        Barcode.cancel();
        return (new MenuWindow()).open();
      });
      return self;
    }

    return HomeWindow;

  })();

  module.exports = HomeWindow;

}).call(this);
