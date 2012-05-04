(function() {

  describe('DB', function() {
    beforeEach(function() {
      return Ti.DB.Util.cleanDB();
    });
    it('should insert users and find them back', function() {
      Ti.DB.Util.insertUser('jack', 'jacktoken');
      Ti.DB.Util.insertUser('rose', 'rosetoken');
      return expect(Ti.DB.Util.allUsers().length).toEqual(2);
    });
    it('should insert user and remove him', function() {
      Ti.DB.Util.insertUser('jack', 'jacktoken');
      Ti.DB.Util.removeUser('jacktoken');
      return expect(Ti.DB.Util.allUsers().length).toEqual(0);
    });
    return it('should insert user and activate him', function() {
      Ti.DB.Util.insertUser('jack', 'jacktoken');
      Ti.DB.Util.activateUser('jacktoken');
      return expect(Ti.DB.Util.activeToken()).toEqual('jacktoken');
    });
  });

}).call(this);
