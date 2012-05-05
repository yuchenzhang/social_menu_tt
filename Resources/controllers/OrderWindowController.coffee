class OrderWindowController
  constructor: (order, user)->
    @order = order
    @user = user
    @window = Ti.UI.createWindow
      title: 'Order'
      navBarHidden: true
      backgroundImage: "images/wooden_floor.jpg"
    @render()
  
  render: ->
    @renderTopBar()
    @renderDishStrip()
  
  renderTopBar: ->
    @top_bar ||= Ti.UI.createView
      backgroundImage: "images/menu_background_1.jpg"
      width: "100%"
      height: 35
      top:0
    back_btn = Titanium.UI.createButton
      color:"black"
      backgroundImage:'images/BUTT_gry_off.png'
      backgroundSelectedImage:'images/BUTT_gry_on.png'
      backgroundDisabledImage: 'images/BUTT_drk_off.png'
      width:50
      height:30
      font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'}
      title:'back'
      left: 5
    @top_bar.add back_btn
    back_btn.addEventListener 'click', =>
      @window.close()
      delete @
    @top_bar.add back_btn
    avatar = Ti.UI.createImageView
      image: @user.get 'avatar'
      width: 25
      height: 25
      left: 145
    @top_bar.add avatar
    name = Ti.UI.createLabel
      color: "white"
      font: {fontSize: 15}
      text: @user.get 'name'
      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
      width: 80
      height: 25
      left: 185
    @top_bar.add name
    price = Ti.UI.createLabel
       color: "black"
       font: {fontSize: 13,fontStyle:"italic"}
       text: '€' + @order.totalPrice()
       textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
       width: 100
       height: 30
       top: 0
       right: 60
    @order.dishes.on 'change', =>
      Ti.API.debug "dishes changed"
      price.text = '€' + @order.totalPrice()
    @top_bar.add price
    send_btn = Titanium.UI.createButton
      color:"black"
      backgroundImage:'images/BUTT_gry_off.png'
      backgroundSelectedImage:'images/BUTT_gry_on.png'
      backgroundDisabledImage: 'images/BUTT_drk_off.png'
      width:50
      height:30
      font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'}
      title:'send'
      right: 5
    @top_bar.add send_btn
    send_btn.addEventListener 'click', =>
      @order.on "error", (model)->
        Ti.API.error 'error to save:' + model.toJSON()
      @order.save()         
    @window.add @top_bar
  
  renderDishStrip: ->
    @dish_strip ||= Ti.UI.createTableView
      backgroundImage: "images/wooden_floor.jpg"
      width: '100%'
      top: 35
      showVerticalScrollIndicator: false
    rows = @order.dishes.map (dish)=>
      @createRowOfType dish
    @dish_strip.setData rows    
    @window.add @dish_strip
         
  createRowOfType: (dish)->
    url = decodeURIComponent dish.pictures.at(0).url() 
    blob = Ti.ImageProcess.cropImageForMenuView url
    row = Ti.UI.createTableViewRow
       height: 'auto'
       layout: "vertical"   
    info_bar = Ti.UI.createView
       backgroundColor: "#D8F6CE"
       width: "100%"
       height: 30
       top: 0
    name = Ti.UI.createLabel
       color: "#900"
       font: {fontSize: 15, fontWeight: 'bold'}
       text: dish.get 'name'
       textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
       width: 160
       height: 30
       top: 0
       left: 12
    price = Ti.UI.createLabel
       color: "black"
       font: {fontSize: 13,fontStyle:"italic"}
       text: '€' + dish.get 'price'
       textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
       width: 100
       height: 30
       top: 0
       right: 12   
    image_bar = Ti.UI.createView
       backgroundImage: blob
       width: '100%'
       height: 140
       borderWidth: 10
       borderColor: 'white' 
       top: 5
    plus_icon = Ti.UI.createImageView
       image: "images/icons/add.png"
       width: 50
       height: 50
       top: 10
       right: 10
    image_bar.add plus_icon
    
    review_bar = Ti.UI.createView
       color:"#fff"
       width: 300
       top: 5
       height: 'auto'
       borderColor: "#bdbdbd"
       borderRadius: 10
    description = Ti.UI.createLabel
       color: "#000"
       font: {fontSize: 12, fontStyle: 'italic'}
       text: dish.get 'description'
       textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
       width: 280
       height: 'auto'
       top: 5
       bottom: 5
          
    plus_icon.addEventListener 'click', =>
       @order.addDish dish
                  
    info_bar.add name
    info_bar.add price
    review_bar.add description  
    row.add info_bar
    row.add image_bar
    row.add review_bar
    my_order = Ti.UI.createView
       color: "#fff"
       top: 5
       left: 5
       width: 100
       height: "auto"
       bottom: 5
    my_order.add Ti.UI.createImageView
       image: @user.get 'avatar'
       left: 10
       width: 25
       height: 25
    my_order.add Ti.UI.createLabel
       text: "+"+dish.get 'count'
       color: "#000"
       font: {fontSize: 14, fontStyle: 'normal', fontWeight: "bold"}
       textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
       width: 'auto'
       height: 'auto'
    minus_icon = Ti.UI.createImageView
       image: "images/icons/remove.png"
       right: 10
       width: 18
       height: 18   
    my_order.add minus_icon
    minus_icon.addEventListener 'click', =>
      @order.removeDish dish
    row.add my_order
    
    @order.on "change_dish:"+dish.id, =>
      Ti.API.debug @order.toJSON()
      row.remove my_order if my_order
      return unless dish.get('count') > 0
      my_order = Ti.UI.createView
       color: "#fff"
       top: 5
       left: 5
       width: 100
       height: "auto"
       bottom: 5
      my_order.add Ti.UI.createImageView
         image: @user.get 'avatar'
         left: 10
         width: 25
         height: 25
      my_order.add Ti.UI.createLabel
         text: "+"+dish.get 'count'
         color: "#000"
         font: {fontSize: 14, fontStyle: 'normal', fontWeight: "bold"}
         textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
         width: 'auto'
         height: 'auto'
      minus_icon = Ti.UI.createImageView
         image: "images/icons/remove.png"
         right: 10
         width: 18
         height: 18   
      my_order.add minus_icon
      minus_icon.addEventListener 'click', =>
        @order.removeDish dish
      row.add my_order             
    return row
       
module.exports = OrderWindowController
