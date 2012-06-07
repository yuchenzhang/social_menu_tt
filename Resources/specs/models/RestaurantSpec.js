(function() {

  describe('Restaurant model', function() {
    var restaurant;
    restaurant = null;
    beforeEach(function() {
      return restaurant = new Ti.Model.Restaurant;
    });
    return describe('validations', function() {
      it('should not accept a blank name', function() {
        return expect(restaurant.set({
          name: ''
        })).toBeFalsy();
      });
      it('should not accept a blank latitude', function() {
        return expect(restaurant.set({
          latitude: ''
        })).toBeFalsy();
      });
      it('should not accept a non-number value for latitude', function() {
        return expect(restaurant.set({
          latitude: 'abc'
        })).toBeFalsy();
      });
      it('should not accept a non-number value for longitude', function() {
        return expect(restaurant.set({
          longitude: 'abc'
        })).toBeFalsy();
      });
      it('should not accept a blank longitude', function() {
        return expect(restaurant.set({
          longitude: ''
        })).toBeFalsy();
      });
      it('should not accept a blank address_line_1', function() {
        return expect(restaurant.set({
          address_line_1: ""
        })).toBeFalsy();
      });
      return it('should not accept a blank city', function() {
        return expect(restaurant.set({
          city: ''
        })).toBeFalsy();
      });
    });
  });

}).call(this);
