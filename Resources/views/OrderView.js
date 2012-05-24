(function() {
  var BaseView, OrderView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseView = require('views/BaseView');

  OrderView = (function(_super) {

    __extends(OrderView, _super);

    function OrderView() {
      this.updateList = __bind(this.updateList, this);
      OrderView.__super__.constructor.apply(this, arguments);
    }

    OrderView.prototype.events = {
      'change:dishes': 'updateList'
    };

    OrderView.prototype.view = null;

    OrderView.prototype.list = null;

    OrderView.prototype.render = function() {
      var back_btn, data, send_btn,
        _this = this;
      this.view = Ti.UI.createView({
        width: 300,
        height: 400,
        backgroundColor: '#777',
        opacity: 0.8,
        top: 5
      });
      data = this.model.dishes.map(function(dish) {
        return {
          title: dish.attributes.name + ' x ' + dish.attributes.count
        };
      });
      this.list = Ti.UI.createTableView({
        data: data,
        scrollable: true,
        height: 350,
        width: 280,
        top: 2
      });
      this.view.add(this.list);
      send_btn = Ti.UI.createButton({
        color: "#fff",
        backgroundImage: 'images/BUTT_grn_off.png',
        backgroundSelectedImage: 'images/BUTT_grn_on.png',
        backgroundDisabledImage: 'images/BUTT_grn_off.png',
        width: 50,
        height: 30,
        font: {
          fontSize: 14,
          fontWeight: 'bold',
          fontFamily: 'Helvetica Neue'
        },
        title: 'Send',
        right: 5,
        bottom: 10
      });
      this.view.add(send_btn);
      send_btn.addEventListener('click', function() {
        _this.model.save({
          status: 'submitted'
        });
        send_btn.title = 'Sent';
        return send_btn.enabled = false;
      });
      back_btn = Ti.UI.createButton({
        color: "#fff",
        backgroundImage: 'images/BUTT_gry_off.png',
        backgroundSelectedImage: 'images/BUTT_gry_on.png',
        backgroundDisabledImage: 'images/BUTT_gry_off.png',
        width: 50,
        height: 30,
        font: {
          fontSize: 14,
          fontWeight: 'bold',
          fontFamily: 'Helvetica Neue'
        },
        title: 'Back',
        left: 5,
        bottom: 10
      });
      this.view.add(back_btn);
      back_btn.addEventListener('click', function() {
        return _this.view.hide();
      });
      return this.view;
    };

    OrderView.prototype.updateList = function() {
      var data;
      data = this.model.dishes.map(function(dish) {
        return {
          title: dish.attributes.name + ' x ' + dish.attributes.count
        };
      });
      return this.list.setData(data);
    };

    return OrderView;

  })(BaseView);

  module.exports = OrderView;

}).call(this);
