class MenuView
  constructor: (title)->
    self = Ti.UI.createWindow({
      title:title,
      url: "./ui/MenuTableView.js"
    })
    
    return self

  
module.exports = MenuView