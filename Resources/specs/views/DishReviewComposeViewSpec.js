(function() {

  describe('DishReviewComposeView', function() {
    var review, view;
    review = null;
    view = null;
    beforeEach(function() {
      review = new Ti.Model.Review({
        picture: (Ti.Filesystem.getFile('images/olive.jpg')).nativePath,
        dish_id: 1
      });
      view = new Ti.View.DishReviewComposeView(review);
      return view.render();
    });
    it('should render the review image and dish', function() {
      expect(view.image.image.text).toEqual((Ti.ImageProcess.cropImage('images/olive.jpg')).text);
      return expect(view.model.attributes.dish_id).toEqual(1);
    });
    return it('should reset with a review with new image and dish', function() {
      review = new Ti.Model.Review({
        picture: (Ti.Filesystem.getFile('images/sashimi.jpg')).nativePath,
        dish_id: 2
      });
      view.reset(review);
      expect(view.model.attributes.picture).toEqual((Ti.Filesystem.getFile('images/sashimi.jpg')).nativePath);
      expect(view.image.image.text).toEqual((Ti.ImageProcess.cropImage('images/olive.jpg')).text);
      return expect(view.model.attributes.dish_id).toEqual(2);
    });
  });

}).call(this);
