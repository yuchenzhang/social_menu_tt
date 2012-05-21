(function() {
  var BaseView, DishRowView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseView = require('views/BaseView');

  DishRowView = (function(_super) {

    __extends(DishRowView, _super);

    function DishRowView() {
      this.order = __bind(this.order, this);
      DishRowView.__super__.constructor.apply(this, arguments);
    }

    DishRowView.prototype.events = {
      'change:count': 'order'
    };

    DishRowView.prototype.row = null;

    DishRowView.prototype.order = null;

    DishRowView.prototype.counter = null;

    DishRowView.prototype.render = function() {
      var description_bar, info_bar, minus_icon, plus_icon, review_bar,
        _this = this;
      this.row = Ti.UI.createTableViewRow({
        height: 'auto',
        layout: "vertical",
        className: 'dish_row'
      });
      info_bar = Ti.UI.createView({
        backgroundColor: "#D8F6CE",
        width: "100%",
        height: 50,
        top: 0
      });
      info_bar.add(Ti.UI.createLabel({
        color: "#900",
        font: {
          fontSize: 15,
          fontWeight: 'bold'
        },
        text: this.model.attributes.name,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        width: 160,
        height: 30,
        top: 0,
        left: 12
      }));
      info_bar.add(Ti.UI.createLabel({
        color: "black",
        font: {
          fontSize: 13,
          fontStyle: "italic"
        },
        text: '€' + this.model.attributes.price,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        width: 100,
        height: 30,
        top: 0,
        right: 60
      }));
      plus_icon = Ti.UI.createImageView({
        image: "images/icons/add.png",
        width: 48,
        height: 48,
        top: 0,
        right: 10
      });
      plus_icon.addEventListener('click', function() {
        return _this.model.plus();
      });
      info_bar.add(plus_icon);
      this.order = Ti.UI.createView({
        color: "#fff",
        top: 32,
        left: 5,
        width: 150,
        height: 25,
        bottom: 5
      });
      this.counter = Ti.UI.createLabel({
        color: "#000",
        font: {
          fontSize: 12,
          fontStyle: 'italic'
        },
        text: 'You want +' + this.model.attributes.count,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        left: 10,
        width: 'auto',
        height: 25
      });
      this.order.add(this.counter);
      minus_icon = Ti.UI.createImageView({
        image: "images/icons/remove.png",
        right: 10,
        width: 18,
        height: 18
      });
      this.order.add(minus_icon);
      minus_icon.addEventListener('click', function() {
        return _this.model.minus();
      });
      info_bar.add(this.order);
      if (!this.model.isOrdered()) this.order.hide();
      description_bar = Ti.UI.createView({
        color: "#fff",
        width: 300,
        top: 5,
        height: 'auto',
        borderColor: "#bdbdbd",
        borderRadius: 10
      });
      description_bar.add(Ti.UI.createLabel({
        color: "#000",
        font: {
          fontSize: 12,
          fontStyle: 'italic'
        },
        text: this.model.attributes.description,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        width: 280,
        height: 'auto',
        top: 5,
        bottom: 5
      }));
      review_bar = (new Ti.View.DishReviewView(this.model.reviews.at(0))).render();
      this.row.add(info_bar);
      this.row.add(description_bar);
      this.row.add(review_bar);
      return this.row;
    };

    DishRowView.prototype.order = function() {
      this.counter.text = "You want +" + this.model.attributes.count;
      if (this.model.isOrdered()) {
        return this.order.show();
      } else {
        return this.order.hide();
      }
    };

    return DishRowView;

  })(BaseView);

  module.exports = DishRowView;

}).call(this);
