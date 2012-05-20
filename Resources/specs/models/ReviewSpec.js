(function() {

  describe('Review model', function() {
    var review;
    review = null;
    beforeEach(function() {
      review = new Ti.Model.Review;
      return jasmine.Ajax.useMock();
    });
    describe('default attributes', function() {
      it('should have default id', function() {
        return expect(review.get('id')).toBeDefined();
      });
      it('should have default user_id', function() {
        return expect(review.get('user_id')).toBeDefined();
      });
      it('should have default dish_id', function() {
        return expect(review.get('dish_id')).toBeDefined();
      });
      it('should have default comment', function() {
        return expect(review.get('comment')).toBeDefined();
      });
      return it('should not have default picture binary', function() {
        return expect(review.get('picture_binary')).toBeUndefined();
      });
    });
    describe('validations', function() {
      beforeEach(function() {
        return review = new Ti.Model.Review({
          id: 1,
          user_id: 1,
          dish_id: 1,
          comment: 'blabla'
        });
      });
      it('should be valid', function() {
        return expect(review.isValid(true)).toBeTruthy();
      });
      describe('id', function() {
        return it('should not require an id', function() {
          return expect(review.set({
            id: null
          })).toBeTruthy();
        });
      });
      describe('user_id', function() {});
      describe('dish_id', function() {});
      describe('comment', function() {
        it('should not accept a comment longer than 140 characters', function() {
          return expect(review.set({
            comment: 'Lorem ipsum dolor sit amet, iudicabit intellegebat sea at, sea minim elitr ad, pri ne eligendi adversarium conclusionemqueLorem ipsum dolor sit amet, iudicabit intellegebat sea at, sea minim elitr ad, pri ne eligendi adversarium conclusionemque'
          })).toBeFalsy();
        });
        return it('should accept a comment within the 140 characters', function() {
          return expect(review.set({
            comment: 'Lorem ipsum dolor sit amet, iudicabit intellegebat sea at, sea minim elitr ad, pri ne eligendi adversarium conclusionemque'
          })).toBeTruthy();
        });
      });
      describe('picture_binary', function() {});
      return describe('picture_url', function() {});
    });
    describe('rest url', function() {
      it('should have the url to save a new record', function() {
        review = new Ti.Model.Review({
          id: null,
          dish_id: 2,
          user_id: 3
        });
        return expect(review.url()).toEqual(Ti.App.endpoint + '/dishes/2/reviews');
      });
      return it('should have the url to update an existing record', function() {
        review = new Ti.Model.Review({
          id: 1,
          dish_id: 2,
          user_id: 3
        });
        return expect(review.url()).toEqual(Ti.App.endpoint + '/dishes/2/reviews/1');
      });
    });
    return describe('save', function() {
      beforeEach(function() {
        return clearAjaxRequests();
      });
      it('should not send save request if a new record is without a picture binary', function() {
        review = new Ti.Model.Review({
          id: null,
          user_id: 1,
          dish_id: 1,
          comment: 'blabla'
        });
        try {
          review.save();
        } catch (_error) {}
        return expect(mostRecentAjaxRequest()).toBeNull();
      });
      it('should send save request for an existing record no matter the picture binary is set or not', function() {
        review = new Ti.Model.Review({
          id: 1,
          user_id: 1,
          dish_id: 1,
          comment: 'blabla'
        });
        try {
          review.save();
        } catch (_error) {}
        return expect(mostRecentAjaxRequest()).not.toBeNull();
      });
      return it('should send save request for a new record when its picture binary is set', function() {
        review = new Ti.Model.Review({
          id: null,
          user_id: 1,
          dish_id: 1,
          comment: 'blabla',
          picture_binary: 'xxxxxx'
        });
        try {
          review.save();
        } catch (_error) {}
        return expect(mostRecentAjaxRequest()).not.toBeNull();
      });
    });
  });

}).call(this);
