class AppWindow
  constructor: (title)->
    self = Ti.UI.createWindow({
      title:title,
      backgroundColor:'white'
    })
    
    button = Ti.UI.createButton({
      height:44,
      width:200,
      title:L('open window'),
      top:20
    })
    self.add button
    
    button.addEventListener 'click', -> 
      # containingTab attribute must be set by parent tab group on
      # the window for this work
      self.containingTab.open Ti.UI.createWindow {
          title: L('newWindow'),
          backgroundColor: 'white'
        }
    
    return self
    
module.exports = AppWindow