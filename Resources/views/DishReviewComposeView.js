(function() {
  var BaseView, DishReviewComposeView,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseView = require('views/BaseView');

  DishReviewComposeView = (function(_super) {

    __extends(DishReviewComposeView, _super);

    function DishReviewComposeView() {
      DishReviewComposeView.__super__.constructor.apply(this, arguments);
    }

    DishReviewComposeView.prototype.view = null;

    DishReviewComposeView.prototype.image = null;

    DishReviewComposeView.prototype.textarea = null;

    DishReviewComposeView.prototype.send_btn = null;

    DishReviewComposeView.prototype.render = function() {
      var back_btn,
        _this = this;
      this.view = Ti.UI.createView({
        width: 300,
        height: 400,
        backgroundColor: '#777',
        top: 5
      });
      this.textarea = Ti.UI.createTextArea({
        color: '#000',
        value: 'Focus to see keyboard with toolbar',
        height: 120,
        width: 280,
        top: 5,
        borderColor: '#000',
        keyboardToolbarColor: '#999',
        keyboardToolbarHeight: 40
      });
      this.image = Ti.UI.createImageView({
        image: Ti.ImageProcess.cropImage(this.model.picture_url()),
        width: 280,
        height: 'auto',
        bottom: 50
      });
      this.send_btn = Ti.UI.createButton({
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
      this.view.add(this.send_btn);
      this.send_btn.addEventListener('click', function() {
        _this.model.save({
          picture_binary: (Ti.Utils.base64encode(_this.image.toImage())).text,
          comment: _this.textarea.value
        }, {
          success: function() {
            return Ti.API.fireEvent('created:review:dish_' + _this.model.attributes.dish_id);
          }
        });
        _this.send_btn.title = 'Sent';
        return _this.send_btn.enabled = false;
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
      this.view.add(this.textarea);
      this.view.add(this.image);
      return this.view;
    };

    DishReviewComposeView.prototype.reset = function(review) {
      this.model.set({
        id: null,
        comment: null,
        picture: review.attributes.picture,
        dish_id: review.attributes.dish_id,
        user_id: null
      });
      this.image.image = Ti.ImageProcess.cropImage(this.model.picture_url());
      this.textarea.value = 'Focus to see keyboard with toolbar';
      this.send_btn.title = 'Send';
      this.send_btn.enabled = true;
      return this.view.show();
    };

    return DishReviewComposeView;

  })(BaseView);

  module.exports = DishReviewComposeView;

}).call(this);
