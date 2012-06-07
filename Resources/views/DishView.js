(function() {
  var BaseView, DishView,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseView = require('views/BaseView');

  DishView = (function(_super) {

    __extends(DishView, _super);

    function DishView() {
      DishView.__super__.constructor.apply(this, arguments);
    }

    DishView.prototype.description = null;

    DishView.prototype.review_table = null;

    DishView.prototype.render = function() {
      var description_bar, view;
      view = Ti.UI.createView({
        width: 320,
        height: 480,
        backgroundColor: '#fff',
        top: 0
      });
      description_bar = Ti.UI.createView({
        color: "#fff",
        width: 300,
        top: 5,
        height: 'auto',
        borderColor: "#bdbdbd",
        borderRadius: 10
      });
      this.description = Ti.UI.createLabel({
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
      });
      description_bar.add(this.description);
      return view;
    };

    DishView.prototype.reset = function(dish) {
      this.model = dish;
      return this.description.text = this.model.attributes.description;
    };

    return DishView;

  })(BaseView);

}).call(this);
