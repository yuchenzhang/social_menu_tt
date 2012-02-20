class AppTabGroup
  constructor: ->
    AppWindow = require 'ui/AppWindow'
    self = Ti.UI.createTabGroup()
    win1 = new AppWindow L('home')
    win2 = new AppWindow L('profile')
   
    tab1 = Ti.UI.createTab {
     title: L('home'),
     icon: '/images/KS_nav_ui.png',
     window: win1
    }
    win1.containingTab = tab1
    
    tab2 = Ti.UI.createTab {
     title: L('profile'),
     icon: '/images/KS_nav_views.png',
     window: win2
    }
    win2.containingTab = tab2
    
    self.addTab tab1
    self.addTab tab2
    
    return self
    
module.exports = AppTabGroup