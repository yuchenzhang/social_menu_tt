MenuData = require 'ui/menu/MenuData'
MenuTableView = require 'ui/menu/MenuTableView'

class MenuWindow
  constructor: (title)->
    data = new MenuData
    self = Ti.UI.createWindow({
      title: data.resto
    })
    
    tableview = new MenuTableView(data.dishes)
    self.add tableview
    
    return self

  
module.exports = MenuWindow