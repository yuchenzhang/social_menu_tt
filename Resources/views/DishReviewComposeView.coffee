BaseView = require 'views/BaseView'
class DishReviewComposeView extends BaseView
  view:null
  image:null
  textarea:null
  send_btn:null
  
  render: ->
    @view = Ti.UI.createView
      width: 300
      height: 400
      backgroundColor: '#777'
      top: 5
    
    #create the text area
    @textarea = Ti.UI.createTextArea
      color : '#000'
      value : 'Focus to see keyboard with toolbar'
      height : 120
      width : 280
      top : 5
      borderColor : '#000'
      keyboardToolbarColor : '#999'
      keyboardToolbarHeight : 40
      
    @image = Ti.UI.createImageView
      image: Ti.ImageProcess.cropImage @model.picture_url()
      width: 280
      height: 'auto'
      bottom: 50
      
    @send_btn = Ti.UI.createButton
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
    @view.add @send_btn
    @send_btn.addEventListener 'click', =>
      @model.save({
        picture_binary: (Ti.Utils.base64encode @image.toImage()).text
        comment:@textarea.value},{
          success: =>
            Ti.API.fireEvent 'created:review:dish_'+@model.attributes.dish_id
        })
      @send_btn.title = 'Sent'
      @send_btn.enabled = false  
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
    
    @view.add @textarea  
    @view.add @image  
    return @view

  reset: (review)->
    @model.set {
      id:null
      comment:null
      picture:review.attributes.picture
      dish_id:review.attributes.dish_id
      user_id: null
    }
    @image.image = Ti.ImageProcess.cropImage @model.picture_url()
    @textarea.value = 'Focus to see keyboard with toolbar'
    @send_btn.title = 'Send'
    @send_btn.enabled = true
    @view.show()
module.exports = DishReviewComposeView