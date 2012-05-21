BaseView = require 'views/BaseView'
class DishRowView extends BaseView
  events:
    'change:count': 'order'
  
  row:null
  order:null
  counter:null
    
  render: ->
    @row = Ti.UI.createTableViewRow
       height: 'auto'
       layout: "vertical"
       className: 'dish_row'   
    
    #info bar
    info_bar = Ti.UI.createView
       backgroundColor: "#D8F6CE"
       width: "100%"
       height: 50
       top: 0
    info_bar.add Ti.UI.createLabel
       color: "#900"
       font: {fontSize: 15, fontWeight: 'bold'}
       text: @model.attributes.name
       textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
       width: 160
       height: 30
       top: 0
       left: 12
    info_bar.add Ti.UI.createLabel
       color: "black"
       font: {fontSize: 13,fontStyle:"italic"}
       text: '€' + @model.attributes.price
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
      @model.plus()
    info_bar.add plus_icon
    @order = Ti.UI.createView
       color: "#fff"
       top: 32
       left: 5
       width: 150
       height: 25
       bottom: 5
    @counter = Ti.UI.createLabel
       color: "#000"
       font: {fontSize: 12, fontStyle: 'italic'}
       text: 'You want +' + @model.attributes.count
       textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
       left: 10
       width: 'auto'
       height: 25
    @order.add @counter
    minus_icon = Ti.UI.createImageView
       image: "images/icons/remove.png"
       right: 10
       width: 18
       height: 18   
    @order.add minus_icon
    minus_icon.addEventListener 'click', =>
      @model.minus()
    info_bar.add @order
    @order.hide() unless @model.isOrdered()
    
    #description   
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
       text: @model.attributes.description
       textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
       width: 280
       height: 'auto'
       top: 5
       bottom: 5
    
    #review     
    review_bar = (new Ti.View.DishReviewView(@model.reviews.at(0))).render()
                       
    @row.add info_bar
    @row.add description_bar
    @row.add review_bar              
    return @row
  
  order: =>
    @counter.text = "You want +"+ @model.attributes.count
    if @model.isOrdered()
      @order.show()
    else
      @order.hide()


module.exports = DishRowView    