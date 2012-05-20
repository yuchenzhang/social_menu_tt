class ReviewWindowController
  constructor: (dish)->
    @dish = dish
    picture_url = @dish.reviews
    @photo_frame = Ti.UI.createView
      backgroundImage: Ti.ImageProcess.cropImage picture_url
      
    @window = Ti.UI.createWindow
      backgroundColor: "#fee"
      titleid: "review_window"
      navBarHidden: true
  
module.exports = ReviewWindowController