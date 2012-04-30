(function() {

  describe('Menu model', function() {
    var menu;
    menu = null;
    beforeEach(function() {
      menu = new Ti.Model.Menu;
      return jasmine.Ajax.useMock();
    });
    describe('attributes', function() {
      it('should have an null id by default', function() {
        return expect(menu.get('id')).toBeNull();
      });
      it('should have a null table number by default', function() {
        return expect(menu.get('table_number')).toBeNull();
      });
      it('should have a null authentication token by default', function() {
        return expect(menu.get('authentication_token')).toBeNull();
      });
      it('should have a url', function() {
        return expect(menu.url()).toMatch(Backbone.Validation.patterns.url);
      });
      it('should have a restaurant', function() {
        return expect(menu.restaurant instanceof Ti.Model.Restaurant).toBeTruthy();
      });
      return it('should have a dish collection', function() {
        return expect(menu.dishes instanceof Ti.Model.DishCollection).toBeTruthy();
      });
    });
    return describe('refetching data when id is updated', function() {
      beforeEach(function() {
        return spyOn(menu, 'fetch').andCallThrough();
      });
      it('should call fetch when both id and token are set', function() {
        menu.set({
          id: '8981a150-712c-012f-0267-58b035fd32cb',
          authentication_token: 'pWyfHDKbBuCP8hjtv6ks'
        });
        return expect(menu.fetch).toHaveBeenCalled();
      });
      it('should not call fetch when token is still null', function() {
        menu.set({
          id: '8981a150-712c-012f-0267-58b035fd32cb'
        });
        return expect(menu.fetch).not.toHaveBeenCalled();
      });
      it('should not call fetch when id is still null', function() {
        menu.set({
          authentication_token: 'pWyfHDKbBuCP8hjtv6ks'
        });
        return expect(menu.fetch).not.toHaveBeenCalled();
      });
      it('should parse new data and trigger event when the fetching succeeded', function() {
        var request;
        spyOn(menu, 'trigger').andCallThrough();
        menu.set({
          id: '8981a150-712c-012f-0267-58b035fd32cb',
          authentication_token: 'pWyfHDKbBuCP8hjtv6ks'
        });
        request = mostRecentAjaxRequest();
        request.response({
          status: 200,
          responseText: JSON.stringify({
            table_number: 1
          })
        });
        expect(menu.get('table_number')).toEqual(1);
        return expect(menu.trigger).toHaveBeenCalledWith('data:refetched');
      });
      return it('should not parse new data or trigger event when the fetch failed', function() {
        var request;
        spyOn(menu, 'trigger').andCallThrough();
        menu.set({
          id: '8981a150-712c-012f-0267-58b035fd32cb',
          authentication_token: 'pWyfHDKbBuCP8hjtv6ks'
        });
        request = mostRecentAjaxRequest();
        request.response({
          status: 401,
          responseText: JSON.stringify({
            error: 'login first'
          })
        });
        expect(menu.get('table_number')).toBeNull();
        return expect(menu.trigger).not.toHaveBeenCalledWith('data:refetched');
      });
    });
  });

}).call(this);
