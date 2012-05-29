BaseView = require 'views/BaseView'
class DishReviewComposeView extends BaseView
  view:null
  image:null
  textarea:null
  
  render: ->
    @view = Ti.UI.createView
      width: 300
      height: 400
      backgroundColor: '#777'
      opacity: 0.8
      top: 5
    
    @image = Ti.UI.createImageView
      image: Ti.ImageProcess.cropImage @model.attributes.picture_binary
      width: 280
      height: 'auto'
      top: 10
      
    #create the text area
    send = Ti.UI.createButton
      title : 'Send'
      style : Ti.UI.iPhone.SystemButtonStyle.DONE
    camera = Ti.UI.createButton
      systemButton : Ti.UI.iPhone.SystemButton.CAMERA
    cancel = Ti.UI.createButton
      systemButton : Ti.UI.iPhone.SystemButton.CANCEL
    flexSpace = Ti.UI.createButton
      systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    @textarea = Ti.UI.createTextArea
      color : '#000'
      value : 'Focus to see keyboard with toolbar'
      height : 120
      width : 280
      bottom : 50
      borderColor : '#000'
      keyboardToolbar : [cancel, flexSpace, camera, flexSpace, send]
      keyboardToolbarColor : '#999'
      keyboardToolbarHeight : 40
    
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
      @model.save({
        picture_binary: (Ti.Utils.base64encode @image.toImage()).text
        comment:@textarea.value})
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
      
    @view.add @image
    @view.add @textarea  
    return @view

  reset: (review)->
    @model.set {
      id:null
      comment:null
      picture_binary:review.attributes.picture_binary
      dish_id:review.attributes.dish_id
      user_id: null
    }
    @image.image = Ti.ImageProcess.cropImage @model.attributes.picture_binary
    @textarea.value = 'Focus to see keyboard with toolbar'
    @view.show()
module.exports = DishReviewComposeView