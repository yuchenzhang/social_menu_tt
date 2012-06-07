(function() {

  describe('Order model', function() {
    var courgette, cucumber, order;
    order = null;
    cucumber = null;
    courgette = null;
    beforeEach(function() {
      var dishes;
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
      order = new Ti.Model.Order({
        restaurant: {
          id: 1
        },
        user: {
          id: 1
        },
        status: 'pending'
      }, dishes);
      jasmine.Ajax.useMock();
      Ti.DB.Util.insertUser('jack', 'jacktoken');
      return Ti.DB.Util.activateUser('jacktoken');
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
    describe('toJSON', function() {
      it('should include the id, restaurant_id, user_id, token and status', function() {
        expect(order.toJSON()['id']).toEqual(order.attributes.id);
        expect(order.toJSON()['restaurant_id']).toEqual(order.attributes.restaurant_id);
        expect(order.toJSON()['user_id']).toEqual(order.attributes.user_id);
        expect(order.toJSON()['status']).toEqual(order.attributes.status);
        return expect(order.toJSON()['authentication_token']).toEqual('jacktoken');
      });
      return it('should include the ordered dishes', function() {
        cucumber.plus();
        return expect(order.toJSON()['dishes']).toEqual([
          {
            id: cucumber.attributes.id,
            count: 1
          }
        ]);
      });
    });
    return describe('save', function() {
      return it('should update the id and status when success', function() {
        order.save();
        mostRecentAjaxRequest().response({
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
    });
  });

}).call(this);
