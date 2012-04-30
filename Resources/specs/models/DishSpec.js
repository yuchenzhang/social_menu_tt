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
      return it('should not have its picture collection defined by default', function() {
        return expect(dish.pictures).toBeUndefined();
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
      return it('should not accept a invalid price', function() {
        return expect(dish.set({
          price: 'abc'
        })).toBeFalsy();
      });
    });
    return describe('set pictures', function() {
      return it('should (re)set the picture collection', function() {
        var pictures;
        pictures = [
          {
            url: 'images/1'
          }, {
            url: 'images/2'
          }
        ];
        dish.setPictures(pictures);
        expect(dish.pictures.size()).toEqual(2);
        return expect(dish.pictures.at(0).get('id')).toEqual('images/1');
      });
    });
  });

}).call(this);
