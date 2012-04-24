(function() {
  var CouponWindowController;

  CouponWindowController = (function() {

    function CouponWindowController(menu) {
      this.menu = menu;
      this.window = Ti.UI.createWindow({
        backgroundColor: "#fee",
        titleid: "coupon_window",
        navBarHidden: true
      });
    }

    return CouponWindowController;

  })();

  module.exports = CouponWindowController;

}).call(this);
