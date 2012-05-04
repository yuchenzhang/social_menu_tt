(function() {

  describe('Order model', function() {
    var order;
    order = null;
    beforeEach(function() {
      order = new Ti.Model.Order;
      return jasmine.Ajax.useMock();
    });
    describe('validations', function() {
      return it('should accept when all necessary attributes are properly given', function() {
        return expect(order.set({
          restaurant_id: 1,
          user_id: 1,
          authentication_token: 'pWyfHDKbBuCP8hjtv6ks',
          status: 'pending',
          id: 1
        })).toBeTruthy();
      });
    });
    return describe('save', function() {
      it('should save with id getting assigned in success', function() {
        var request;
        order.set({
          restaurant_id: 1,
          user_id: 1,
          authentication_token: 'pWyfHDKbBuCP8hjtv6ks'
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
        order.save();
        request = mostRecentAjaxRequest();
        request.response({
          status: 201,
          responseText: JSON.stringify({
            id: 19,
            restaurant: {
              id: 1,
              name: 'soho Eindhoven'
            },
            host: {
              id: 1,
              name: 'jack'
            },
            status: 'pending',
            dishes: [
              {
                name: 'cucumber',
                price: '2.5',
                id: 1
              }, {
                name: 'courgette',
                price: '4.5',
                id: 2
              }
            ]
          })
        });
        expect(order.get('id')).toEqual(19);
        return expect(order.get('status')).toEqual('pending');
      });
      return it('should trigger error in failure', function() {
        var request, trigger;
        trigger = spyOn(order, 'trigger').andCallThrough();
        order.save();
        request = mostRecentAjaxRequest();
        request.response({
          status: 401,
          responseText: JSON.stringify({
            error: 'log in first'
          })
        });
        return expect(trigger.mostRecentCall.args[0]).toEqual('error');
      });
    });
  });

}).call(this);
