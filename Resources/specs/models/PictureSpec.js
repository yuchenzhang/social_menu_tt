(function() {

  describe('Picture model', function() {
    var picture;
    picture = null;
    beforeEach(function() {
      return picture = new Ti.Model.Picture;
    });
    describe('default attribute', function() {
      it('should have a default id', function() {
        return expect(picture.get('id')).toBeDefined();
      });
      return it('should have a url', function() {
        return expect(picture.url()).toMatch(Backbone.Validation.patterns.url);
      });
    });
    return describe('validation', function() {
      return it('should not accept blank id', function() {
        return expect(picture.set({
          id: ''
        })).toBeFalsy();
      });
    });
  });

}).call(this);
