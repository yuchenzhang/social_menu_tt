BaseView = require 'views/BaseView'
class DishReviewComposeView extends BaseView
  
  render: ->
    scanner = Titanium.UI.createView
      width:260
      height:200
      borderColor:'red'
      borderWidth:5
      borderRadius:15
    
    button = Titanium.UI.createButton
      color:'#fff'
      backgroundImage:'images/BUTT_grn_on.png'
      backgroundSelectedImage:'images/BUTT_grn_off.png'
      backgroundDisabledImage: 'images/BUTT_gry_on.png'
      bottom:10
      width:301
      height:57
      font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'}
      title:'Take Picture'
    
    
    messageView = Titanium.UI.createView
      height:30
      width:250
      visible:false
    
    
    indView = Titanium.UI.createView
      height:30
      width:250
      backgroundColor:'#000'
      borderRadius:10
      opacity:0.7
    
    messageView.add indView
    
    #message
    message = Titanium.UI.createLabel
      text:'Picture Taken'
      color:'#fff'
      font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'}
      width:'auto'
      height:'auto'
    
    messageView.add message 
    
    overlay = Titanium.UI.createView()
    overlay.add scanner
    overlay.add button
    overlay.add messageView
    
    button.addEventListener 'click', ->
      scanner.borderColor = 'blue'
      Ti.Media.takePicture()
      messageView.animate {visible:true} 
      setTimeout (->
        scanner.borderColor = 'red'
        messageView.animate {visible:false}),500
    
    Ti.Media.showCamera 
      success: (event)->
        Ti.API.debug "picture was taken" 
        #assign the image to review
        @model.set {picture_binary: event.media}  
        #programatically hide the camera
        Ti.Media.hideCamera()
      cancel: ->
      error: (error)->
        a = Titanium.UI.createAlertDialog {title:'Camera'}
        if error.code == Ti.Media.NO_CAMERA
          a.setMessage 'Please run this test on device'
        else
          a.setMessage 'Unexpected error: ' + error.code
        a.show()
      overlay:overlay
      showControls:false #don't show system controls
      mediaTypes:Ti.Media.MEDIA_TYPE_PHOTO
      autohide:false  #tell the system not to auto-hide and we'll do it ourself

  
module.exports = DishReviewComposeView