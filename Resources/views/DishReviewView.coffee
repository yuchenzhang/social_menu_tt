BaseView = require 'views/BaseView'
class DishReviewView extends BaseView
  events:
    'change:rewritable':'tappableOverlay'
    
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
      top: 185
      left: 20
    @comment = Ti.UI.createLabel
      text: @model.attributes.comment
      color: "#000"
      font: {fontSize: 12, fontStyle: 'italic'}
      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
      top: 185
      left: 43
      width: 240
      height: 54
    @review_bar.add @comment
    @review_bar.add Ti.UI.createImageView
      image: 'images/icons/heart.png'
      width: 18
      height: 18
      top: 239
      left: 20
    @review_bar.add Ti.UI.createLabel
      text: '5 likes'
      color: "#000"
      font: {fontSize: 12, fontStyle: 'italic'}
      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
      top: 239
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
      (new Ti.View.DishReviewComposeView @model).render()
    @image.add overlay
    
module.exports = DishReviewView