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
      return it('should have an avatar by default', function() {
        return expect(user.attributes.avatar).toEqual('images/icons/jack.png');
      });
    });
    describe("validations", function() {
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
      return it('should accept a email with proper format', function() {
        return expect(user.set({
          email: 'jack@gmail.com'
        })).toBeTruthy();
      });
    });
    return describe("signIn", function() {
      it('should not allow sign in if validation fails', function() {
        spyOn(user, 'isValid').andReturn(false);
        return expect(user.signIn()).toBeFalsy();
      });
      it('should retrieve the token when success', function() {
        var signInSuccess,
          _this = this;
        signInSuccess = null;
        user.on('signIn:success', function() {
          return signInSuccess = true;
        });
        user.signIn();
        mostRecentAjaxRequest().response({
          status: 200,
          responseText: JSON.stringify({
            id: 1,
            name: 'jack',
            email: 'jack@socialmenu.fm',
            avatar: '/system/users/avatars/000/000/001/medium/jack.png?1335375841',
            authentication_token: 'pWyfHDKbBuCP8hjtv6ks'
          })
        });
        expect(signInSuccess).toEqual(true);
        return expect(user.attributes.authentication_token).toEqual('pWyfHDKbBuCP8hjtv6ks');
      });
      return it('should not update token and trigger signIn:error when failure', function() {
        var signInSuccess,
          _this = this;
        signInSuccess = null;
        user.on('signIn:error', function() {
          return signInSuccess = false;
        });
        user.signIn();
        mostRecentAjaxRequest().response({
          status: 401,
          responseText: JSON.stringify({
            error: "invalid email or password"
          })
        });
        expect(signInSuccess).toEqual(false);
        return expect(user.attributes.authentication_token).toBeUndefined();
      });
    });
  });

}).call(this);
