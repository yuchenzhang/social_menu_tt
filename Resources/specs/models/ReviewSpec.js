(function() {

  describe('Review model', function() {
    var review;
    review = null;
    beforeEach(function() {
      review = new Ti.Model.Review;
      return jasmine.Ajax.useMock();
    });
    describe('attributes', function() {
      return it('should have default rewritable false', function() {
        return expect(review.attributes.rewritable).toBeFalsy();
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
        return it('should be validated as a id pattern', function() {
          return expect(review.set({
            id: 'abc'
          })).toBeFalsy();
        });
      });
      describe('user_id', function() {
        return it('should be validated as a id pattern', function() {
          return expect(review.set({
            user_id: 'abc'
          })).toBeFalsy();
        });
      });
      describe('dish_id', function() {
        it('should be required', function() {
          return expect(review.set({
            dish_id: null
          })).toBeFalsy();
        });
        return it('should be validated as a id pattern', function() {
          return expect(review.set({
            dish_id: 'abc'
          })).toBeFalsy();
        });
      });
      return describe('comment', function() {
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
    });
    describe('url', function() {
      it('should return the url to save a new record when id not set', function() {
        review = new Ti.Model.Review({
          id: null,
          dish_id: 2,
          user_id: 3
        });
        return expect(review.url()).toEqual(Ti.App.endpoint + '/dishes/2/reviews');
      });
      return it('should return the url to update an existing record when id is set', function() {
        review = new Ti.Model.Review({
          id: 1,
          dish_id: 2,
          user_id: 3
        });
        return expect(review.url()).toEqual(Ti.App.endpoint + '/dishes/2/reviews/1');
      });
    });
    describe('save', function() {
      beforeEach(function() {
        return review = new Ti.Model.Review({
          user_id: 1,
          dish_id: 1,
          comment: 'blabla'
        });
      });
      it('should set picture binary', function() {
        var blob, f;
        f = Ti.Filesystem.getFile('images/olive.jpg');
        blob = Ti.Utils.base64encode(f.read()).text;
        review.set({
          picture_binary: blob
        });
        return expect(review.attributes.picture_binary).toEqual(blob);
      });
      return it('should save a new review and update the returned user_id and id but not change the dish_id', function() {
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
            user: {
              id: 10
            },
            dish: {
              id: 2
            },
            comment: 'blabla'
          })
        });
        expect(review.attributes.id).toEqual(9);
        expect(review.attributes.user_id).toEqual(10);
        expect(review.attributes.dish_id).toEqual(1);
        return expect(review.attributes.saved_at).toEqual('2011-3-3 11:21:22');
      });
    });
    return describe('refetch', function() {
      beforeEach(function() {
        return review = new Ti.Model.Review({
          id: 1,
          user_id: 1,
          dish_id: 1,
          comment: 'blabla'
        });
      });
      it('should set the id temporarily to -1', function() {
        review.refetch();
        return expect(review.attributes.id).toEqual(-1);
      });
      return it('should update the comment and trigger refetched event when success', function() {
        spyOn(review, 'trigger');
        review.refetch();
        mostRecentAjaxRequest().response({
          status: 200,
          responseText: JSON.stringify({
            id: 1,
            user: {
              id: 10
            },
            dish: {
              id: 1
            },
            comment: 'woohooo'
          })
        });
        expect(review.attributes.comment).toEqual('woohooo');
        return expect(review.trigger).toHaveBeenCalledWith('review:refetched');
      });
    });
  });

}).call(this);
