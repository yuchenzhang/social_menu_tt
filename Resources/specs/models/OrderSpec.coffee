describe 'Order model', ->
  order = null
  beforeEach ->
    order = new Ti.Model.Order
    jasmine.Ajax.useMock()
    
  describe 'validations', ->
    it 'should accept when all necessary attributes are properly given', ->
      expect(order.set {restaurant_id:1,user_id:1,status:'pending',id:1}).toBeTruthy() 
    it 'should require a restaurant id', ->
      expect(order.validate {restaurant_id: null}).toEqual ['restaurant_id is required']
    it 'should require a user id', ->
      expect(order.validate {user_id: null}).toEqual ['user_id is required']
    it 'should require a status', ->
      expect(order.validate {status: null}).toEqual ['status is required']
    it 'should live without id', ->
      expect(order.validate {id:null}).not.toEqual ['id is required']    
    it 'should not accept unsolicited value for status', ->
      expect(order.validate {status: 'bla'}).toEqual ["status must be one of: pending, submitted, confirmed, reopened, closed, canceled"]   
  describe 'save', ->
    it 'should save with id getting assigned in success', ->
      order.set
        restaurant_id: 1
        user_id: 1 
      order.addDish(new Ti.Model.Dish {id:1, name:'cucumber',price:'2.5'})
      order.addDish(new Ti.Model.Dish {id:2, name:'courgette',price:'4.5'})
      order.save()
      request = mostRecentAjaxRequest()
      request.response({
        status: 201
        responseText: JSON.stringify({
            id:19
            restaurant:
              id:1
              name:'soho Eindhoven'
            host:
              id:1
              name:'jack'
            status: 'pending'
            dishes:[
              {name:'cucumber',price:'2.5',id:1},
              {name:'courgette',price:'4.5',id:2}
            ]
        })
      })
      expect(order.get 'id').toEqual 19
      expect(order.get 'status').toEqual 'pending'
    it 'should trigger error in failure', ->
      trigger = spyOn(order, 'trigger').andCallThrough()
      order.save()
      request = mostRecentAjaxRequest()
      request.response({
        status: 401
        responseText: JSON.stringify({
            error: 'log in first'
        })
      })
      expect(trigger.mostRecentCall.args[0]).toEqual 'error'
