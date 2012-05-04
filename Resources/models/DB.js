(function() {

  exports.allUsers = function() {
    var db, results, userQuery;
    try {
      db = Ti.Database.open(Ti.DB.name);
      userQuery = db.execute('SELECT name,authentication_token FROM Users');
      results = [];
      while (userQuery.isValidRow()) {
        Ti.API.debug("find user:" + userQuery.fieldByName('name'));
        results.push({
          name: userQuery.fieldByName('name'),
          authentication_token: userQuery.fieldByName('authentication_token')
        });
        userQuery.next();
      }
      db.close();
      return results;
    } catch (e) {
      return Ti.API.error(e);
    }
  };

  exports.insertUser = function(name, token) {
    var db;
    try {
      db = Ti.Database.open(Ti.DB.name);
      db.execute('CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY, name TEXT, authentication_token TEXT, idle BOOLEAN)');
      db.execute('INSERT INTO Users (name, authentication_token,idle) VALUES(?,?,?)', name, token, true);
      return db.close();
    } catch (e) {
      return Ti.API.error(e);
    }
  };

  exports.removeUser = function(token) {
    var db;
    try {
      db = Ti.Database.open(Ti.DB.name);
      db.execute('DELETE FROM Users WHERE authentication_token = ?', token);
      return db.close();
    } catch (e) {
      return Ti.API.error(e);
    }
  };

  exports.activateUser = function(token) {
    var db;
    try {
      db = Ti.Database.open(Ti.DB.name);
      db.execute('UPDATE Users SET idle = ? WHERE idle = ?', true, false);
      db.execute('UPDATE Users SET idle = ? WHERE authentication_token = ?', false, token);
      return db.close();
    } catch (e) {
      return Ti.API.error(e);
    }
  };

  exports.activeToken = function() {
    var db, result, tokenQuery;
    try {
      db = Ti.Database.open(Ti.DB.name);
      tokenQuery = db.execute('SELECT authentication_token FROM Users WHERE idle = ?', false);
      result = tokenQuery.fieldByName('authentication_token');
      db.close();
      return result;
    } catch (e) {
      return Ti.API.error(e);
    }
  };

  exports.cleanDB = function() {
    var db;
    try {
      Ti.API.debug("cleaning db " + Ti.DB.name);
      db = Ti.Database.open(Ti.DB.name);
      db.execute('DELETE FROM Users');
      return db.close();
    } catch (e) {
      return Ti.API.error(e);
    }
  };

}).call(this);
