MenuData = require 'ui/menu/MenuData'
MenuTableView = require 'ui/menu/MenuTableView'

class MenuWindow
  constructor: (uuid)->
    data = new MenuData(uuid)
    self = Ti.UI.createWindow({
      title: data.restaurant.name
    })
    
    tableview = new MenuTableView(data.dishes)
    self.add tableview
    
    return self

  
module.exports = MenuWindow