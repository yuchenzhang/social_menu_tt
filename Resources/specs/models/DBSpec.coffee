describe 'DB', ->
    beforeEach ->
      Ti.DB.Util.cleanDB()
      
    it 'should insert users and find them back', ->
      Ti.DB.Util.insertUser 'jack','jacktoken'
      Ti.DB.Util.insertUser 'rose', 'rosetoken'
      expect(Ti.DB.Util.allUsers().length).toEqual 2
    it 'should insert user and remove him', ->
      Ti.DB.Util.insertUser 'jack', 'jacktoken'
      Ti.DB.Util.removeUser 'jacktoken'
      expect(Ti.DB.Util.allUsers().length).toEqual 0
    it 'should insert user and activate him', ->
      Ti.DB.Util.insertUser 'jack', 'jacktoken'
      Ti.DB.Util.activateUser 'jacktoken'
      expect(Ti.DB.Util.activeToken()).toEqual 'jacktoken'  