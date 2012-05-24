class MenuWindowController
  constructor: (menu, user)->
    @menu = menu
    @user = user
    @order = new Ti.Model.Order {
      user_id:@user.attributes.id
      restaurant_id:@menu.restaurant.attributes.id
      status:'pending'},menu.dishes
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
        @order_view = (new Ti.View.OrderView(@order)).render()
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
    @dish_strip ||= Ti.UI.createTableView
      backgroundImage: "images/wooden_floor.jpg"
      width: '100%'
      top: 70
      showVerticalScrollIndicator: false
    rows = @menu.dishes.map (dish)=>
      (new Ti.View.DishRowView(dish)).render()
    @dish_strip.setData rows    
    @window.add @dish_strip
     
          
module.exports = MenuWindowController
