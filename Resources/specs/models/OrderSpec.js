(function() {

  describe('Order model', function() {
    var order;
    order = null;
    beforeEach(function() {
      return order = new Ti.Model.Order;
    });
    return describe('save', function() {
      return it('should return a cutomized json', function() {
        order.set({
          restaurant_id: 1,
          user_id: 1
        });
        order.addDish(new Ti.Model.Dish({
          id: 1,
          name: 'cucumber',
          price: '2.5'
        }));
        order.addDish(new Ti.Model.Dish({
          id: 2,
          name: 'courgette',
          price: '4.5'
        }));
        return order.save();
      });
    });
  });

}).call(this);
