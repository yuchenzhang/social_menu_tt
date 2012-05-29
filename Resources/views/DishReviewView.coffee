BaseView = require 'views/BaseView'
class DishReviewView extends BaseView
  events:
    'change:rewritable':'tappableOverlay'
    'change': 'refillContent'
    
  review_bar:null
  image:null
  comment:null
  
  render: ->
    @review_bar = Ti.UI.createView
       width: '100%'
       height: 'auto'
       top: 5    
    @review_bar.add Ti.UI.createLabel
      color: "#000"
      font: {fontSize: 12, fontStyle: 'italic'}
      text: 'just now reviewed by ' 
      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
      top: 5
      left: 10
      width: 120
      height: 25 
    @review_bar.add Ti.UI.createLabel
      color: "#000"
      font: {fontSize: 14, fontStyle: 'normal', fontWeight: 'bold'}
      text: @model.attributes.user_name
      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
      top: 5
      left: 132
      width: 'auto'
      height: 25  
    @image = Ti.UI.createImageView
       image: Ti.ImageProcess.cropImage (decodeURIComponent @model.picture_url())
       width:  290
       height: 'auto' 
       top: 38
       right:10
    @image.add Ti.UI.createImageView
      image: @model.attributes.user_avatar
      width: 30
      height: 30
      top: 2
      left: 2
    @review_bar.add @image
    @review_bar.add Ti.UI.createImageView
      image: 'images/icons/comment.png'
      width: 18
      height: 18
      top: 225
      left: 20
    @comment = Ti.UI.createLabel
      text: @model.attributes.comment
      color: "#000"
      font: {fontSize: 12, fontStyle: 'italic'}
      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
      top: 225
      left: 43
      width: 240
      height: 54
    @review_bar.add @comment
    @review_bar.add Ti.UI.createImageView
      image: 'images/icons/heart.png'
      width: 18
      height: 18
      top: 279
      left: 20
    @review_bar.add Ti.UI.createLabel
      text: '5 likes'
      color: "#000"
      font: {fontSize: 12, fontStyle: 'italic'}
      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
      top: 279
      left: 43
      width: 50
      height: 'auto'
      bottom: 5
    
    return @review_bar
    
  tappableOverlay: =>
    overlay = Ti.UI.createImageView
      image: "images/icons/dark_camera@2x.png"
      opacity: 0.8
      height: 'auto'
    overlay.addEventListener 'click', =>
      Ti.Media.openPhotoGallery 
        success: (event)=>
          try
            review = new Ti.Model.Review
              dish_id: @model.attributes.dish_id
              picture_binary: event.media
            Ti.API.fireEvent 'new:review', review        
          catch e
            alert e   
        cancel: ->
        error: (error)=>
          a = Titanium.UI.createAlertDialog {title:'Camera'}
          if error.code == Ti.Media.NO_CAMERA
            a.setMessage 'Please run this test on device'
            f = Ti.Filesystem.getFile 'images/olive.jpg'
            review = new Ti.Model.Review
              dish_id: @model.attributes.dish_id
              picture_binary: f.read()
            Ti.API.fireEvent 'new:review', review        
          else
            a.setMessage 'Unexpected error: ' + error.code
          a.show()
        showControls:true #don't show system controls
        mediaTypes:Ti.Media.MEDIA_TYPE_PHOTO
        autohide:true  #tell the system not to auto-hide and we'll do it ourself
        allowEditing: true    
    @image.add overlay
    
  refillContent: =>
    Ti.API.debug "refill content for review " + @model.attributes.id
    @image.image = Ti.ImageProcess.cropImage decodeURIComponent @model.picture_url()
    @comment.text = @model.attributes.comment
      
module.exports = DishReviewView