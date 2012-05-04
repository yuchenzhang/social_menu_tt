(function() {
  var TabGroupController;

  TabGroupController = (function() {

    function TabGroupController(user) {
      var coupon_tab, coupon_window, home_tab, home_window, memo_tab, memo_window, menu, tab_group;
      tab_group = Ti.UI.createTabGroup({
        titleid: 'tab_group'
      });
      menu = new Ti.Model.Menu;
      home_window = (new Ti.Controller.HomeWindow(menu, user)).window;
      coupon_window = (new Ti.Controller.CouponWindow(menu)).window;
      memo_window = (new Ti.Controller.MemoWindow(menu)).window;
      memo_tab = Ti.UI.createTab({
        titleid: "memo_tab",
        window: memo_window
      });
      memo_window.containingTab = memo_tab;
      tab_group.addTab(memo_tab);
      home_tab = Ti.UI.createTab({
        titleid: "home_tab",
        window: home_window
      });
      home_window.containingTab = home_tab;
      tab_group.addTab(home_tab);
      coupon_tab = Ti.UI.createTab({
        titleid: "coupon_tab",
        window: coupon_window
      });
      coupon_window.containingTab = coupon_tab;
      tab_group.addTab(coupon_tab);
      tab_group.setActiveTab(home_tab);
      tab_group.open({
        transition: Titanium.UI.iPhone && Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
      });
    }

    return TabGroupController;

  })();

  module.exports = TabGroupController;

}).call(this);
