(function() {
  var BaseView, TimelineView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseView = require('views/BaseView');

  TimelineView = (function(_super) {

    __extends(TimelineView, _super);

    function TimelineView() {
      this.renderList = __bind(this.renderList, this);
      TimelineView.__super__.constructor.apply(this, arguments);
    }

    TimelineView.prototype.events = {
      'timeline:refetched': 'renderList'
    };

    TimelineView.prototype.review_strip = null;

    TimelineView.prototype.render = function() {
      var view;
      view = Ti.UI.createView({
        width: 320,
        height: 480,
        backgroundColor: "#ffa",
        top: 10
      });
      this.review_strip = Ti.UI.createTableView({
        backgroundImage: "images/wooden_floor.jpg",
        width: '100%',
        showVerticalScrollIndicator: false
      });
      this.renderList();
      view.add(this.review_strip);
      return view;
    };

    TimelineView.prototype.renderList = function() {
      var rows,
        _this = this;
      rows = this.model.reviews.map(function(re) {
        var row;
        row = Ti.UI.createTableViewRow({
          height: 'auto',
          layout: "vertical",
          className: 'timeline_row'
        });
        row.add((new Ti.View.DishReviewView(re)).render());
        return row;
      });
      return this.review_strip.setData(rows);
    };

    return TimelineView;

  })(BaseView);

  module.exports = TimelineView;

}).call(this);
