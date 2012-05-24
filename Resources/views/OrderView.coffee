BaseView = require 'views/BaseView'
class OrderView extends BaseView
  events:
    'change:dishes':'updateList'
  
  view:null
  list:null
  
  render: ->
    @view = Ti.UI.createView
      width: 300
      height: 400
      backgroundColor: '#777'
      opacity: 0.8
      top: 5
    
    data = @model.dishes.map (dish)->
      {title:dish.attributes.name + ' x ' + dish.attributes.count} 
    @list = Ti.UI.createTableView
      data: data
      scrollable: true
      height: 350
      width: 280
      top: 2
    @view.add @list  
    send_btn = Ti.UI.createButton
      color:"#fff"
      backgroundImage:'images/BUTT_grn_off.png'
      backgroundSelectedImage:'images/BUTT_grn_on.png'
      backgroundDisabledImage: 'images/BUTT_grn_off.png'
      width:50
      height:30
      font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'}
      title:'Send'
      right: 5
      bottom: 10
    @view.add send_btn
    send_btn.addEventListener 'click', =>
      @model.save({status:'submitted'})
      send_btn.title = 'Sent'
      send_btn.enabled = false
    back_btn = Ti.UI.createButton
      color:"#fff"
      backgroundImage:'images/BUTT_gry_off.png'
      backgroundSelectedImage:'images/BUTT_gry_on.png'
      backgroundDisabledImage: 'images/BUTT_gry_off.png'
      width:50
      height:30
      font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'}
      title:'Back'
      left: 5
      bottom: 10
    @view.add back_btn 
    back_btn.addEventListener 'click', =>
      @view.hide()
    return @view
    
  updateList: =>
    data = @model.dishes.map (dish)->
      {title:dish.attributes.name + ' x ' + dish.attributes.count}
    @list.setData data    

    
module.exports = OrderView