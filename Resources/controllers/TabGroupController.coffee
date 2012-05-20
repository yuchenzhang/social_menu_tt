class TabGroupController
  constructor: (user)->
    tab_group = Ti.UI.createTabGroup
      titleid: 'tab_group'
    
    menu = new Ti.Model.Menu
    home_window = (new Ti.Controller.HomeWindow(menu,user)).window
    timeline_window = (new Ti.Controller.TimelineWindow(user)).window
    trending_window = (new Ti.Controller.TrendingWindow(user)).window
    message_window = (new Ti.Controller.MessageWindow(user)).window
    profile_window = (new Ti.Controller.ProfileWindow(user)).window
      
    timeline_tab = Ti.UI.createTab
      window: timeline_window
      icon: "images/tabs/light_book@2x.png"
    timeline_window.containingTab = timeline_tab
    tab_group.addTab timeline_tab
    
    trending_tab = Ti.UI.createTab
      window: trending_window
      icon: "images/tabs/light_star@2x.png"
    trending_window.containingTab = trending_tab  
    tab_group.addTab trending_tab
    
    home_tab = Ti.UI.createTab
      window: home_window
      icon: "images/tabs/light_home@2x.png"
    home_window.containingTab = home_tab
    tab_group.addTab home_tab
    
    message_tab = Ti.UI.createTab
      window: message_window
      icon: "images/tabs/light_mail@2x.png"
    message_window.containingTab = message_tab
    tab_group.addTab message_tab
    
    profile_tab = Ti.UI.createTab
      window: profile_window
      icon: "images/tabs/light_pegman@2x.png"
    profile_window.containingTab = profile_tab
    tab_group.addTab profile_tab
    
    
    tab_group.setActiveTab home_tab
    tab_group.open
      transition: Titanium.UI.iPhone && Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT

module.exports = TabGroupController