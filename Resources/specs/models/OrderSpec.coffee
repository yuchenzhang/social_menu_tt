describe 'Order model', ->
  order = null
  cucumber = new Ti.Model.Dish {id:1, name:'cucumber',price:'2.5', description: 'bla'}
  courgette = new Ti.Model.Dish {id:2, name:'courgette',price:'4.5', description: 'bla'}
  dishes = new Ti.Model.DishCollection [cucumber,courgette]
  
  beforeEach ->
    order = new Ti.Model.Order {restaurant_id:1,user_id:1,status:'pending'}, dishes
  
  describe 'initialize', ->
    it 'should assign a restaurant id', ->
      expect(order.attributes.restaurant_id).toEqual 1
    it 'should add a dish when that dishs count is plused', ->
      cucumber.plus()
      cucumber.plus()
      courgette.plus()
      expect(order.dishes.length).toEqual 2
      expect(order.totalPrice()).toEqual 9.5
    it 'should trigger change:dishes event when a dish is ordered', ->
      spyOn order, 'trigger'
      cucumber.plus()
      expect(order.trigger).toHaveBeenCalledWith 'change:dishes'
  
  describe 'validations', ->
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
    beforeEach ->
      jasmine.Ajax.useMock()
    it 'should save with id getting assigned in success', ->
      order.save()
      request = mostRecentAjaxRequest()
      request.response({
        status: 201
        responseText: JSON.stringify({
            id:19
            restaurant:
              id:1
              name:'soho Eindhoven'
            user:
              id:1
              name:'jack'
            status: 'submitted'
            dishes:[
              {name:'cucumber',price:'2.5',id:1},
              {name:'courgette',price:'4.5',id:2}
            ]
        })
      })
      expect(order.attributes.id).toEqual 19
      expect(order.attributes.status).toEqual 'submitted'
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







