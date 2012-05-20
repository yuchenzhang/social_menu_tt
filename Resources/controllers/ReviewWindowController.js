(function() {
  var ReviewWindowController;

  ReviewWindowController = (function() {

    function ReviewWindowController(dish) {
      var picture_url;
      this.dish = dish;
      picture_url = this.dish.reviews;
      this.photo_frame = Ti.UI.createView({
        backgroundImage: Ti.ImageProcess.cropImage(picture_url)
      });
      this.window = Ti.UI.createWindow({
        backgroundColor: "#fee",
        titleid: "review_window",
        navBarHidden: true
      });
    }

    return ReviewWindowController;

  })();

  module.exports = ReviewWindowController;

}).call(this);
