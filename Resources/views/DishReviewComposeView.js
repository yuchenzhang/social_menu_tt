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

    DishReviewComposeView.prototype.render = function() {
      var back_btn, camera, cancel, flexSpace, send, send_btn,
        _this = this;
      this.view = Ti.UI.createView({
        width: 300,
        height: 400,
        backgroundColor: '#777',
        opacity: 0.8,
        top: 5
      });
      this.image = Ti.UI.createImageView({
        image: Ti.ImageProcess.cropImage(this.model.attributes.picture_binary),
        width: 280,
        height: 'auto',
        top: 10
      });
      send = Ti.UI.createButton({
        title: 'Send',
        style: Ti.UI.iPhone.SystemButtonStyle.DONE
      });
      camera = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.CAMERA
      });
      cancel = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.CANCEL
      });
      flexSpace = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
      });
      this.textarea = Ti.UI.createTextArea({
        color: '#000',
        value: 'Focus to see keyboard with toolbar',
        height: 120,
        width: 280,
        bottom: 50,
        borderColor: '#000',
        keyboardToolbar: [cancel, flexSpace, camera, flexSpace, send],
        keyboardToolbarColor: '#999',
        keyboardToolbarHeight: 40
      });
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
          picture_binary: (Ti.Utils.base64encode(_this.image.toImage())).text,
          comment: _this.textarea.value
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
      this.view.add(this.image);
      this.view.add(this.textarea);
      return this.view;
    };

    DishReviewComposeView.prototype.reset = function(review) {
      this.model.set({
        id: null,
        comment: null,
        picture_binary: review.attributes.picture_binary,
        dish_id: review.attributes.dish_id,
        user_id: null
      });
      this.image.image = Ti.ImageProcess.cropImage(this.model.attributes.picture_binary);
      this.textarea.value = 'Focus to see keyboard with toolbar';
      return this.view.show();
    };

    return DishReviewComposeView;

  })(BaseView);

  module.exports = DishReviewComposeView;

}).call(this);
