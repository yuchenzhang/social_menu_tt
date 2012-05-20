describe 'Menu model', ->
  menu = null
  beforeEach ->
    menu = new Ti.Model.Menu
    jasmine.Ajax.useMock()
    
  describe 'attributes', ->  
    it 'should have an null id by default', ->
      expect(menu.get 'id').toBeNull()
    it 'should have a null table number by default', ->
      expect(menu.get 'table_number').toBeNull()
    it 'should have a restaurant', ->
      expect(menu.restaurant instanceof Ti.Model.Restaurant).toBeTruthy()
    it 'should have a dish collection', ->
      expect(menu.dishes instanceof Ti.Model.DishCollection).toBeTruthy()
    
  describe 'refetching data when id is updated', ->
    beforeEach ->
      Ti.DB.Util.cleanDB()
      spyOn(menu, 'fetch').andCallThrough()
      menu.fetch.reset()    
    it 'should call fetch when both id and token are set', ->
      Ti.DB.Util.insertUser 'jack', 'jacktoken'
      Ti.DB.Util.activateUser 'jacktoken'
      spyOn(Ti.DB.Util, 'activeToken').andReturn('xxxxx')
      menu.set {id:'8981a150-712c-012f-0267-58b035fd32cb'}
      expect(menu.fetch).toHaveBeenCalled()
    it 'should not call fetch when token is still null', ->
      menu.set {id:'8981a150-712c-012f-0267-58b035fd32cb'}
      expect(menu.fetch).not.toHaveBeenCalled()
    it 'should parse new data and trigger event when the fetching succeeded', ->
      Ti.DB.Util.insertUser 'jack', 'jacktoken'
      Ti.DB.Util.activateUser 'jacktoken'
      spyOn(menu,'trigger').andCallThrough()
      menu.set {id:'8981a150-712c-012f-0267-58b035fd32cb'}
      request = mostRecentAjaxRequest()
      request.response({
        status: 200
        responseText: JSON.stringify({
            table_number: 1
        })
      })
      expect(menu.get 'table_number').toEqual 1
      expect(menu.trigger).toHaveBeenCalledWith('data:refetched')
    it 'should not parse new data or trigger event when the fetch failed', ->
      Ti.DB.Util.insertUser 'jack', 'jacktoken'
      Ti.DB.Util.activateUser 'jacktoken'
      spyOn(menu,'trigger').andCallThrough()
      menu.set {id:'8981a150-712c-012f-0267-58b035fd32cb'}
      request = mostRecentAjaxRequest()
      request.response({
        status: 401
        responseText: JSON.stringify({
            error: 'login first'
        })
      })
      expect(menu.get 'table_number').toBeNull()
      expect(menu.trigger).not.toHaveBeenCalledWith('data:refetched')      
