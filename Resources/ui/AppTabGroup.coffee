class AppTabGroup
  constructor: (homeW,menuW,memoW,profileW,orderW,couponW)->
    AppWindow = require 'ui/AppWindow'
    MenuWindow = require 'ui/menu/MenuWindow'
    self = Ti.UI.createTabGroup()
    
    
    win1 = new AppWindow L('win1')
    win2 = new AppWindow L('win2')
    win3 = new MenuWindow
    win4 = new AppWindow L('Reviews')
    win5 = new AppWindow L('Profile')
    
    tab1 = Ti.UI.createTab {
      title: L('win1'),
      icon: '/images/KS_nav_ui.png',
      window: win1
    }
    win1.containingTab = tab1
    
    tab2 = Ti.UI.createTab {
      title: L('win2'),
      icon: '/images/KS_nav_ui.png',
      window: win2
    }
    win2.containingTab = tab2
    
    tab3 = Ti.UI.createTab {
     title: L('Menu'),
     icon: '/images/Titanium_Iconpack_1/light_2x/light_doc@2x.png',
     window: win3, 
     width: 120,
     height: 'auto'
    }
    win3.containingTab = tab3
    
    tab4 = Ti.UI.createTab {
     title: L('Reviews'),
     icon: '/images/Titanium_Iconpack_1/light_2x/light_book@2x.png',
     window: win4
    }
    win4.containingTab = tab4
    
    tab5 = Ti.UI.createTab {
      title: L('Profile'),
      icon: '/images/Titanium_Iconpack_1/light_2x/light_pegman@2x.png',
      window: win5
    }
    win5.containingTab = tab5
    
    self.addTab tab1
    self.addTab tab2
    self.addTab tab3
    self.addTab tab4
    self.addTab tab5
    
    return self
    
module.exports = AppTabGroup