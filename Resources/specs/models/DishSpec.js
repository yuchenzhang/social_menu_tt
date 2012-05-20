(function() {

  describe('Dish model', function() {
    var dish;
    dish = null;
    beforeEach(function() {
      return dish = new Ti.Model.Dish;
    });
    describe('default attributes', function() {
      it('should have a default id', function() {
        return expect(dish.get('id')).toBeDefined();
      });
      it('should have a default name', function() {
        return expect(dish.get('name')).toBeDefined();
      });
      it('should have a default price', function() {
        return expect(dish.get('price')).toBeDefined();
      });
      it('should not have its review collection defined by default', function() {
        return expect(dish.reviews).toBeUndefined();
      });
      return it('should not have its count defined by default', function() {
        return expect(dish.count).toBeUndefined();
      });
    });
    describe('validations', function() {
      it('should not accept a invalid id', function() {
        return expect(dish.set({
          id: 'abc'
        })).toBeFalsy();
      });
      it('should not accept a null id', function() {
        return expect(dish.set({
          id: null
        })).toBeFalsy();
      });
      it('should not accept a null name', function() {
        return expect(dish.set({
          name: null
        })).toBeFalsy();
      });
      it('should not accept a null price', function() {
        return expect(dish.set({
          price: null
        })).toBeFalsy();
      });
      it('should not accept a invalid price', function() {
        return expect(dish.set({
          price: 'abc'
        })).toBeFalsy();
      });
      return it('should not accept a minus count', function() {
        return expect(dish.set({
          count: -1
        })).toBeFalsy();
      });
    });
    return describe('parse', function() {
      return it('should (re)set the review collection and return the dish attributes', function() {
        var attributes, data;
        data = {
          name: 'bla',
          price: 1,
          description: 'blabla',
          reviews: [
            {
              id: 1,
              comment: 'blabla',
              picture: 'images/1.png',
              user: {
                id: 1,
                name: 'jack',
                avatar: 'avatars/jack.png'
              }
            }, {
              id: 2,
              comment: 'blabla',
              picture: 'images/2.png',
              user: {
                id: 2,
                name: 'rose',
                avatar: 'avatars/rose.png'
              }
            }
          ]
        };
        attributes = {
          name: 'bla',
          price: 1,
          description: 'blabla'
        };
        expect(dish.parse(data)).toEqual(attributes);
        expect(dish.reviews.size()).toEqual(2);
        expect(dish.reviews.at(0) instanceof Ti.Model.Review).toBeTruthy();
        return expect(dish.reviews.at(0).get('id')).toEqual(1);
      });
    });
  });

}).call(this);
