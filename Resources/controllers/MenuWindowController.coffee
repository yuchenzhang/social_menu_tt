class MenuWindowController
  constructor: (menu, user)->
    @menu = menu
    @user = user
    @order = new Ti.Model.Order {restaurant_id:@menu.restaurant.get('id'),user_id:@user.get('id')}
    @window = Ti.UI.createWindow
      title: 'SocialMenu menupage'
      backgroundImage: "images/wooden_floor.jpg"
      navBarHidden: true
    @render()
    
  render: ->  
    return unless @menu.id
    @renderTopBar()
    @renderDishStrip()
  
  renderTopBar: ->
    @top_bar ||= Ti.UI.createView
      backgroundImage: "images/menu_background_1.jpg"
      width: "100%"
      height: 35
      top:0
    checkout_btn = Titanium.UI.createButton
      color:'#fff'
      backgroundImage:'images/BUTT_grn_off.png'
      backgroundSelectedImage:'images/BUTT_grn_on.png'
      backgroundDisabledImage: 'images/BUTT_drk_off.png'
      width:150
      height:30
      font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'}
      title:'Check my orders'
      right: 5
    @top_bar.add checkout_btn
    checkout_btn.addEventListener 'click', =>
      order_window = (new Ti.Controller.OrderWindow(@order,@user)).window
      order_window.containingTab = @window.containingTab
      @window.containingTab.open order_window
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
      @menu.set {id:null}
      delete @
    @user_bar ||= Ti.UI.createView
      backgroundColor: "transparent"
      width: "100%"
      height: 35
      top:35
    avatar = Ti.UI.createImageView
      image: @user.get 'avatar'
      width: 25
      height: 25
      left: 10
    @user_bar.add avatar
    name = Ti.UI.createLabel
      color: "white"
      font: {fontSize: 15}
      text: @user.get 'name'
      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
      width: 80
      height: 25
      left: 40
    @user_bar.add name   
    @window.add @top_bar
    @window.add @user_bar
        
  renderDishStrip: ->
    Ti.API.debug 'render dishstrip'
    @dish_strip ||= Ti.UI.createTableView
      backgroundImage: "images/wooden_floor.jpg"
      width: '100%'
      top: 70
      showVerticalScrollIndicator: false
    rows = @menu.dishes.map (dish)=>
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
    my_order = null
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
          
module.exports = MenuWindowController
