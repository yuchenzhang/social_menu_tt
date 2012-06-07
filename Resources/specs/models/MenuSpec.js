(function() {

  describe('Menu model', function() {
    var menu;
    menu = null;
    beforeEach(function() {
      menu = new Ti.Model.Menu;
      return jasmine.Ajax.useMock();
    });
    describe('initialize', function() {
      it('should have a restaurant', function() {
        return expect(menu.restaurant instanceof Ti.Model.Restaurant).toBeTruthy();
      });
      return it('should have a dish collection', function() {
        return expect(menu.dishes instanceof Ti.Model.DishCollection).toBeTruthy();
      });
    });
    return describe('fetch', function() {
      beforeEach(function() {
        Ti.DB.Util.cleanDB();
        spyOn(menu, 'fetch').andCallThrough();
        return menu.fetch.reset();
      });
      it('should call fetch when both id and token are set', function() {
        Ti.DB.Util.insertUser('jack', 'jacktoken');
        Ti.DB.Util.activateUser('jacktoken');
        spyOn(Ti.DB.Util, 'activeToken').andReturn('xxxxx');
        menu.set({
          id: '8981a150-712c-012f-0267-58b035fd32cb'
        });
        return expect(menu.fetch).toHaveBeenCalled();
      });
      it('should not call fetch when token is still null', function() {
        menu.set({
          id: '8981a150-712c-012f-0267-58b035fd32cb'
        });
        return expect(menu.fetch).not.toHaveBeenCalled();
      });
      it('should parse new data and trigger event when the fetching succeeded', function() {
        Ti.DB.Util.insertUser('jack', 'jacktoken');
        Ti.DB.Util.activateUser('jacktoken');
        spyOn(menu, 'trigger').andCallThrough();
        menu.set({
          id: '8981a150-712c-012f-0267-58b035fd32cb'
        });
        mostRecentAjaxRequest().response({
          status: 200,
          responseText: JSON.stringify({
            table_number: 1
          })
        });
        expect(menu.attributes.table_number).toEqual(1);
        return expect(menu.trigger).toHaveBeenCalledWith('menu:refetched');
      });
      return it('should not parse new data or trigger event when the fetch failed', function() {
        Ti.DB.Util.insertUser('jack', 'jacktoken');
        Ti.DB.Util.activateUser('jacktoken');
        spyOn(menu, 'trigger').andCallThrough();
        menu.set({
          id: '8981a150-712c-012f-0267-58b035fd32cb'
        });
        mostRecentAjaxRequest().response({
          status: 401,
          responseText: JSON.stringify({
            error: 'login first'
          })
        });
        expect(menu.attributes.table_number).toBeNull();
        return expect(menu.trigger).not.toHaveBeenCalledWith('menu:refetched');
      });
    });
  });

}).call(this);
