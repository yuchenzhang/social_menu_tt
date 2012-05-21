(function() {
  var BaseView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BaseView = (function() {

    BaseView.prototype.events = {
      foo: 'bar'
    };

    function BaseView(model) {
      this.bar = __bind(this.bar, this);
      var _this = this;
      this.model = model;
      _.each(this.events, function(func, event) {
        return _this.model.bind(event, _this[func]);
      });
      this.foo_count = 0;
    }

    BaseView.prototype.bar = function() {
      return this.foo_count++;
    };

    return BaseView;

  })();

  module.exports = BaseView;

}).call(this);
