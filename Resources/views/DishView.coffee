BaseView = require 'views/BaseView'
class DishView extends BaseView
  
  description: null
  review_table: null
  
  render: ->
    view = Ti.UI.createView
      width: 320
      height: 480
      backgroundColor: '#fff'
      top: 0
    description_bar = Ti.UI.createView
       color:"#fff"
       width: 300
       top: 5
       height: 'auto'
       borderColor: "#bdbdbd"
       borderRadius: 10 
    @description = Ti.UI.createLabel
       color: "#000"
       font: {fontSize: 12, fontStyle: 'italic'}
       text: @model.attributes.description
       textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
       width: 280
       height: 'auto'
       top: 5
       bottom: 5
    description_bar.add @description
      
    return view
    
  reset: (dish)->
    @model = dish #this should release the old dish model
    @description.text = @model.attributes.description
      
      
