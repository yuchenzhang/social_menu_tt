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

    DishReviewComposeView.prototype.render = function() {
      var button, indView, message, messageView, overlay, scanner;
      scanner = Titanium.UI.createView({
        width: 260,
        height: 200,
        borderColor: 'red',
        borderWidth: 5,
        borderRadius: 15
      });
      button = Titanium.UI.createButton({
        color: '#fff',
        backgroundImage: 'images/BUTT_grn_on.png',
        backgroundSelectedImage: 'images/BUTT_grn_off.png',
        backgroundDisabledImage: 'images/BUTT_gry_on.png',
        bottom: 10,
        width: 301,
        height: 57,
        font: {
          fontSize: 20,
          fontWeight: 'bold',
          fontFamily: 'Helvetica Neue'
        },
        title: 'Take Picture'
      });
      messageView = Titanium.UI.createView({
        height: 30,
        width: 250,
        visible: false
      });
      indView = Titanium.UI.createView({
        height: 30,
        width: 250,
        backgroundColor: '#000',
        borderRadius: 10,
        opacity: 0.7
      });
      messageView.add(indView);
      message = Titanium.UI.createLabel({
        text: 'Picture Taken',
        color: '#fff',
        font: {
          fontSize: 20,
          fontWeight: 'bold',
          fontFamily: 'Helvetica Neue'
        },
        width: 'auto',
        height: 'auto'
      });
      messageView.add(message);
      overlay = Titanium.UI.createView();
      overlay.add(scanner);
      overlay.add(button);
      overlay.add(messageView);
      button.addEventListener('click', function() {
        scanner.borderColor = 'blue';
        Ti.Media.takePicture();
        messageView.animate({
          visible: true
        });
        return setTimeout((function() {
          scanner.borderColor = 'red';
          return messageView.animate({
            visible: false
          });
        }), 500);
      });
      return Ti.Media.showCamera({
        success: function(event) {
          Ti.API.debug("picture was taken");
          this.model.set({
            picture_binary: event.media
          });
          return Ti.Media.hideCamera();
        },
        cancel: function() {},
        error: function(error) {
          var a;
          a = Titanium.UI.createAlertDialog({
            title: 'Camera'
          });
          if (error.code === Ti.Media.NO_CAMERA) {
            a.setMessage('Please run this test on device');
          } else {
            a.setMessage('Unexpected error: ' + error.code);
          }
          return a.show();
        },
        overlay: overlay,
        showControls: false,
        mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
        autohide: false
      });
    };

    return DishReviewComposeView;

  })(BaseView);

  module.exports = DishReviewComposeView;

}).call(this);
