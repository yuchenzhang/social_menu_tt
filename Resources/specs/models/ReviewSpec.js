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
      return it('should have default comment', function() {
        return expect(review.get('comment')).toBeDefined();
      });
    });
    describe('validations', function() {
      beforeEach(function() {
        review = new Ti.Model.Review({
          id: 1,
          user_id: 1,
          dish_id: 1,
          comment: 'blabla'
        });
        return review.bind('error', function(model, error) {
          return Ti.API.error("error:" + error);
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
      return describe('picture_url', function() {});
    });
    return describe('rest url', function() {
      it('should have the url to save a new record', function() {
        review = new Ti.Model.Review({
          id: null,
          dish_id: 2,
          user_id: 3
        });
        return expect(review.url()).toEqual(Ti.App.endpoint + '/dishes/2/reviews');
      });
      it('should have the url to update an existing record', function() {
        review = new Ti.Model.Review({
          id: 1,
          dish_id: 2,
          user_id: 3
        });
        return expect(review.url()).toEqual(Ti.App.endpoint + '/dishes/2/reviews/1');
      });
      return describe('save', function() {
        beforeEach(function() {
          review = new Ti.Model.Review({
            user_id: 1,
            dish_id: 1,
            comment: 'blabla'
          });
          return review.bind('error', function(model, error) {
            return Ti.API.error("error:" + error);
          });
        });
        it('should set picture binary', function() {
          var blob, f;
          f = Ti.Filesystem.getFile('images/olive.jpg');
          blob = Ti.Utils.base64encode(f.read()).text;
          review.set({
            picture_binary: blob
          });
          return expect(review.get('picture_binary')).toEqual(blob);
        });
        return it('should save a new review and update the returned user_id and id', function() {
          var request;
          review.save(null, {
            success: function(model, resp) {
              return model.set({
                saved_at: '2011-3-3 11:21:22'
              });
            }
          });
          request = mostRecentAjaxRequest();
          request.response({
            status: 201,
            responseText: JSON.stringify({
              id: 9,
              user_id: 10,
              dish_id: 1,
              comment: 'blabla'
            })
          });
          expect(review.attributes.id).toEqual(9);
          expect(review.attributes.user_id).toEqual(10);
          expect(review.attributes.dish_id).toEqual(1);
          return expect(review.attributes.saved_at).toEqual('2011-3-3 11:21:22');
        });
      });
    });
  });

}).call(this);
