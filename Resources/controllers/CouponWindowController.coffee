class CouponWindowController
  constructor: (menu)->
    @menu = menu
    @window = Ti.UI.createWindow
      backgroundColor: "#fee"
      titleid: "coupon_window"
      navBarHidden: true
      
module.exports = CouponWindowController
