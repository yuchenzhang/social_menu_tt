(function() {

  describe('BaseView', function() {
    var model, view;
    view = null;
    model = null;
    beforeEach(function() {
      model = new Backbone.Model;
      return view = new Ti.View.BaseView(model);
    });
    it('should assign a model', function() {
      return expect(view.model).toBe(model);
    });
    return it('should delegate event handling', function() {
      expect(view.foo_count).toEqual(0);
      model.trigger('foo');
      return expect(view.foo_count).toEqual(1);
    });
  });

}).call(this);
