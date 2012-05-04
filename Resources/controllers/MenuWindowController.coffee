class MenuWindowController
  constructor: (menu, user)->
    @menu = menu
    @user = user
    @order = new Ti.Model.Order
    @window = Ti.UI.createWindow
      title: 'SocialMenu menupage'
      backgroundColor: 'white'
      navBarHidden: true
    @render()
    
  render: ->  
    return unless @menu.id
    @renderTopBar()
    @renderDishStrip()
  
  renderTopBar: ->
    Ti.API.debug "render topbar"
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
    avatar = Ti.UI.createImageView
      image: @user.get 'avatar'
      width: 25
      height: 25
      left: 10
    @top_bar.add avatar
    name = Ti.UI.createLabel
      color: "white"
      font: {fontSize: 15}
      text: @user.get 'name'
      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
      width: 80
      height: 25
      left: 40
    @top_bar.add name   
    @window.add @top_bar
        
  renderDishStrip: ->
    Ti.API.debug 'render dishstrip'
    @dish_strip ||= Ti.UI.createTableView
      backgroundImage: "images/menu_background_1.jpg"
      width: '100%'
      top: 35
      showVerticalScrollIndicator: false
    rows = @menu.dishes.map (dish)=>
      @createRowOfType dish, 1
    @dish_strip.setData rows
        
    @window.add @dish_strip
    
  cropImageForMenuView: (url, type)->
    switch type
      when 1
        baseImage = Ti.UI.createImageView
          image: url
          width: 320
          height: 'auto'
        cropView = Ti.UI.createView
          width: 320
          height: 140
        cropView.add baseImage
        croppedImage = cropView.toImage()
        return croppedImage
      when 2
        return
         
  createRowOfType: (dish)->
    url = decodeURIComponent dish.pictures.at(0).url() 
    blob = @cropImageForMenuView url, 1
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
    memo = Ti.UI.createLabel
       color: "black"
       font: {fontSize: 13,fontStyle:"italic"}
       text: "20+ memos"
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
    info_bar.add memo
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
