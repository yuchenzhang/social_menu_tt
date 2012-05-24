(function() {

  describe('Order model', function() {
    var courgette, cucumber, dishes, order;
    order = null;
    cucumber = new Ti.Model.Dish({
      id: 1,
      name: 'cucumber',
      price: '2.5',
      description: 'bla'
    });
    courgette = new Ti.Model.Dish({
      id: 2,
      name: 'courgette',
      price: '4.5',
      description: 'bla'
    });
    dishes = new Ti.Model.DishCollection([cucumber, courgette]);
    beforeEach(function() {
      return order = new Ti.Model.Order({
        restaurant_id: 1,
        user_id: 1,
        status: 'pending'
      }, dishes);
    });
    describe('initialize', function() {
      it('should assign a restaurant id', function() {
        return expect(order.attributes.restaurant_id).toEqual(1);
      });
      it('should add a dish when that dishs count is plused', function() {
        cucumber.plus();
        cucumber.plus();
        courgette.plus();
        expect(order.dishes.length).toEqual(2);
        return expect(order.totalPrice()).toEqual(9.5);
      });
      return it('should trigger change:dishes event when a dish is ordered', function() {
        spyOn(order, 'trigger');
        cucumber.plus();
        return expect(order.trigger).toHaveBeenCalledWith('change:dishes');
      });
    });
    describe('validations', function() {
      it('should require a restaurant id', function() {
        return expect(order.validate({
          restaurant_id: null
        })).toEqual(['restaurant_id is required']);
      });
      it('should require a user id', function() {
        return expect(order.validate({
          user_id: null
        })).toEqual(['user_id is required']);
      });
      it('should require a status', function() {
        return expect(order.validate({
          status: null
        })).toEqual(['status is required']);
      });
      it('should live without id', function() {
        return expect(order.validate({
          id: null
        })).not.toEqual(['id is required']);
      });
      return it('should not accept unsolicited value for status', function() {
        return expect(order.validate({
          status: 'bla'
        })).toEqual(["status must be one of: pending, submitted, confirmed, reopened, closed, canceled"]);
      });
    });
    return describe('save', function() {
      beforeEach(function() {
        return jasmine.Ajax.useMock();
      });
      it('should save with id getting assigned in success', function() {
        var request;
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
            user: {
              id: 1,
              name: 'jack'
            },
            status: 'submitted',
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
        expect(order.attributes.id).toEqual(19);
        return expect(order.attributes.status).toEqual('submitted');
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
