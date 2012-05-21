class MenuWindowController
  constructor: (menu, user)->
    @menu = menu
    @user = user
    @order = new Ti.Model.Order {restaurant_id:@menu.restaurant.get('id'),user_id:@user.get('id'), status: 'pending'}
    @window = Ti.UI.createWindow
      title: 'SocialMenu menupage'
      backgroundImage: "images/wooden_floor.jpg"
      navBarHidden: true
    @render()
    @guide_view = null
    @order_view = null
    
  render: ->  
    return unless @menu.id
    @renderTopBar()
    @renderUserBar()
    @renderDishStrip()
  
  renderTopBar: ->
    @top_bar ||= Ti.UI.createView
      backgroundImage: "images/menu_background_1.jpg"
      width: "100%"
      height: 35
      top:0
    order_btn = Ti.UI.createButton
      color:'#fff'
      backgroundImage:'images/BUTT_grn_off.png'
      backgroundSelectedImage:'images/BUTT_grn_on.png'
      backgroundDisabledImage: 'images/BUTT_drk_off.png'
      width:50
      height:30
      font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'}
      title:'Order'
      right: 5
    @top_bar.add order_btn
    order_btn.addEventListener 'click', =>
      if @order_view
        @order_view.show()
      else
        @order_view = (new Ti.Controller.MenuOrderView(@order)).view
        @window.add @order_view
    guide_btn = Ti.UI.createButton
      color:"#fff"
      backgroundImage:'images/BUTT_grn_off.png'
      backgroundSelectedImage:'images/BUTT_grn_on.png'
      backgroundDisabledImage: 'images/BUTT_drk_off.png'
      width:50
      height:30
      font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'}
      title:'Guide'
      right:130
    @top_bar.add guide_btn
    guide_btn.addEventListener 'click', =>
      if @guide_view
        @guide_view.show()
      else
        @guide_view = (new Ti.Controller.MenuGuideView(@menu)).view
        @window.add @guide_view  
    back_btn = Ti.UI.createButton
      color:"#000"
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
    @window.add @top_bar
    
  renderUserBar: ->
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
    order_status = Ti.UI.createLabel
      color: "white"
      font: {fontSize: 15}
      text: 'order ' + @order.attributes.status
      textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
      width: 160
      height: 25
      right: 5
    @order.on "change:status", =>
      order_status.text = 'order ' + @order.attributes.status
    @user_bar.add order_status
    @window.add @user_bar
        
  renderDishStrip: ->
    Ti.API.debug 'render dishstrip'
    @dish_strip ||= Ti.UI.createTableView
      backgroundImage: "images/wooden_floor.jpg"
      width: '100%'
      top: 70
      showVerticalScrollIndicator: false
    rows = @menu.dishes.map (dish)=>
      @createDishRow dish
    @dish_strip.setData rows    
    @window.add @dish_strip
         
  createDishRow: (dish)->
    row = Ti.UI.createTableViewRow
       height: 'auto'
       layout: "vertical"   
    
    info_bar = Ti.UI.createView
       backgroundColor: "#D8F6CE"
       width: "100%"
       height: 50
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
       right: 60
    plus_icon = Ti.UI.createImageView
       image: "images/icons/add.png"
       width: 48
       height: 48
       top: 0
       right: 10
    plus_icon.addEventListener 'click', =>
       @order.addDish dish
    info_bar.add name
    info_bar.add price
    info_bar.add plus_icon
    my_order = null
    @order.on "change_dish:"+dish.id, =>
      if my_order
        info_bar.remove my_order
        my_order = null 
      return unless dish.get('count') > 0
      my_order = Ti.UI.createView
         color: "#fff"
         top: 32
         left: 5
         width: 100
         height: 25
         bottom: 5
      my_order.add Ti.UI.createLabel
         color: "#000"
         font: {fontSize: 12, fontStyle: 'italic'}
         text: @user.get 'name'
         textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
         left: 10
         width: 25
         height: 25
      my_order.add Ti.UI.createLabel
         text: "+"+dish.get 'count'
         color: "#000"
         font: {fontSize: 14, fontStyle: 'italic'}
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
      info_bar.add my_order
       
    description_bar = Ti.UI.createView
       color:"#fff"
       width: 300
       top: 5
       height: 'auto'
       borderColor: "#bdbdbd"
       borderRadius: 10
    description_bar.add Ti.UI.createLabel
       color: "#000"
       font: {fontSize: 12, fontStyle: 'italic'}
       text: dish.get 'description'
       textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
       width: 280
       height: 'auto'
       top: 5
       bottom: 5
         
    review_bar = Ti.UI.createView
       width: '100%'
       height: 'auto'
       top: 5    
    review_bar.add Ti.UI.createLabel
      color: "#000"
      font: {fontSize: 12, fontStyle: 'italic'}
      text: 'just now reviewed by ' 
      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
      top: 5
      left: 10
      width: 120
      height: 25 
    review_bar.add Ti.UI.createLabel
      color: "#000"
      font: {fontSize: 14, fontStyle: 'normal', fontWeight: 'bold'}
      text: dish.reviews.at(0).attributes.user_name
      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
      top: 5
      left: 132
      width: 'auto'
      height: 25  
    url = decodeURIComponent dish.reviews.at(0).picture_url() 
    blob = Ti.ImageProcess.cropImage url  
    image = Ti.UI.createImageView
       image: blob
       width:  290
       height: 'auto' 
       top: 38
       right:10
    image.add Ti.UI.createImageView
      image: dish.reviews.at(0).attributes.user_avatar
      width: 30
      height: 30
      top: 2
      left: 2
    review_bar.add image
    review_bar.add Ti.UI.createImageView
      image: 'images/icons/comment.png'
      width: 18
      height: 18
      top: 185
      left: 20
    review_bar.add Ti.UI.createLabel
      text: dish.reviews.at(0).attributes.comment
      color: "#000"
      font: {fontSize: 12, fontStyle: 'italic'}
      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
      top: 185
      left: 43
      width: 240
      height: 54
    review_bar.add Ti.UI.createImageView
      image: 'images/icons/heart.png'
      width: 18
      height: 18
      top: 239
      left: 20
    review_bar.add Ti.UI.createLabel
      text: '5 likes'
      color: "#000"
      font: {fontSize: 12, fontStyle: 'italic'}
      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
      top: 239
      left: 43
      width: 50
      height: 'auto'
      bottom: 5                   
    row.add info_bar
    row.add description_bar
    row.add review_bar
    
    @order.on "change:status", =>
      if @order.attributes.status == "confirmed" and parseInt(dish.attributes.count) > 0
        Ti.API.debug "making the overlay"
        overlay = Ti.UI.createImageView
          image: "images/icons/dark_camera@2x.png"
          opacity: 0.8
          height: 'auto'
        image.add overlay              
    return row 
          
module.exports = MenuWindowController
