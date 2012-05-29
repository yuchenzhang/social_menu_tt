(function() {

  describe('DishReviewComposeView', function() {
    var review, view;
    review = null;
    view = null;
    beforeEach(function() {
      review = new Ti.Model.Review({
        picture_binary: (Ti.Filesystem.getFile('images/olive.jpg')).read(),
        dish_id: 1
      });
      view = new Ti.View.DishReviewComposeView(review);
      return view.render();
    });
    it('should render the review image and dish', function() {
      expect(view.image.image).toEqual(Ti.ImageProcess.cropImage('images/olive.jpg'));
      return expect(view.model.attributes.dish_id).toEqual(1);
    });
    return it('should reset with a review with new image and dish', function() {
      review = new Ti.Model.Review({
        picture_binary: (Ti.Filesystem.getFile('images/sashimi.jpg')).read(),
        dish_id: 2
      });
      view.reset(review);
      expect(view.image.image).toEqual(Ti.ImageProcess.cropImage('images/sashimi.jpg'));
      return expect(view.model.attributes.dish_id).toEqual(2);
    });
  });

}).call(this);
