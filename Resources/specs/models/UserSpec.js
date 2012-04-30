(function() {

  describe('User model', function() {
    var user;
    user = null;
    beforeEach(function() {
      user = new Ti.Model.User({
        name: 'jack',
        email: 'jack@socialmenu.fm',
        password: 'password'
      });
      return jasmine.Ajax.useMock();
    });
    describe('attributes', function() {
      it('should have an assigned name', function() {
        return expect(user.get('name')).toEqual('jack');
      });
      it('should have an assigned email', function() {
        return expect(user.get('email')).toEqual('jack@socialmenu.fm');
      });
      it('should have an assigned password', function() {
        return expect(user.get('password')).toEqual('password');
      });
      it('should have an avatar by default', function() {
        return expect(user.get('avatar')).toEqual('images/icons/jack.png');
      });
      return it('should have a url', function() {
        return expect(user.url()).toMatch(Backbone.Validation.patterns.url);
      });
    });
    describe("validations", function() {
      it('should not accept empty name', function() {
        return expect(user.set({
          name: ''
        })).toBeFalsy();
      });
      it('should accept a name', function() {
        return expect(user.set({
          name: 'jack'
        })).toBeTruthy();
      });
      it('should not accept an empty email', function() {
        return expect(user.set({
          email: ''
        })).toBeFalsy();
      });
      it('should not accept a email without proper format', function() {
        return expect(user.set({
          email: 'thisisnotanemail'
        })).toBeFalsy();
      });
      it('should accept a email with proper format', function() {
        return expect(user.set({
          email: 'jack@gmail.com'
        })).toBeTruthy();
      });
      return it('should accept an empty password', function() {
        return expect(user.set({
          password: ''
        })).toBeTruthy();
      });
    });
    return describe("signIn", function() {
      it('should not allow sign in if validation fails', function() {
        spyOn(user, 'isValid').andReturn(false);
        return expect(user.signIn()).toBeFalsy();
      });
      it('should retrieve the token when succeed in sign in', function() {
        var request;
        spyOn(user, 'set');
        user.signIn();
        request = mostRecentAjaxRequest();
        request.response({
          status: 200,
          responseText: JSON.stringify({
            id: 1,
            name: 'jack',
            email: 'jack@socialmenu.fm',
            avatar: '/system/users/avatars/000/000/001/medium/jack.png?1335375841',
            authentication_token: 'pWyfHDKbBuCP8hjtv6ks'
          })
        });
        return expect(user.set).toHaveBeenCalledWith({
          authentication_token: 'pWyfHDKbBuCP8hjtv6ks'
        });
      });
      return it('should not update token when failed in sign in', function() {
        var request;
        spyOn(user, 'set');
        user.signIn();
        request = mostRecentAjaxRequest();
        request.response({
          status: 401,
          responseText: JSON.stringify({
            error: "invalid email or password"
          })
        });
        return expect(user.set).not.toHaveBeenCalledWith();
      });
    });
  });

}).call(this);
