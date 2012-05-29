(function() {
  var BaseView, DishReviewView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseView = require('views/BaseView');

  DishReviewView = (function(_super) {

    __extends(DishReviewView, _super);

    function DishReviewView() {
      this.refillContent = __bind(this.refillContent, this);
      this.tappableOverlay = __bind(this.tappableOverlay, this);
      DishReviewView.__super__.constructor.apply(this, arguments);
    }

    DishReviewView.prototype.events = {
      'change:rewritable': 'tappableOverlay',
      'refetched': 'refillContent'
    };

    DishReviewView.prototype.review_bar = null;

    DishReviewView.prototype.image = null;

    DishReviewView.prototype.comment = null;

    DishReviewView.prototype.render = function() {
      var _this = this;
      this.review_bar = Ti.UI.createView({
        width: '100%',
        height: 'auto',
        top: 5
      });
      this.review_bar.add(Ti.UI.createLabel({
        color: "#000",
        font: {
          fontSize: 12,
          fontStyle: 'italic'
        },
        text: 'just now reviewed by ',
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        top: 5,
        left: 10,
        width: 120,
        height: 25
      }));
      this.review_bar.add(Ti.UI.createLabel({
        color: "#000",
        font: {
          fontSize: 14,
          fontStyle: 'normal',
          fontWeight: 'bold'
        },
        text: this.model.attributes.user_name,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        top: 5,
        left: 132,
        width: 'auto',
        height: 25
      }));
      this.image = Ti.UI.createImageView({
        image: decodeURIComponent(this.model.picture_url()),
        width: 290,
        height: 'auto',
        top: 38,
        right: 10
      });
      this.image.add(Ti.UI.createImageView({
        image: this.model.attributes.user_avatar,
        width: 30,
        height: 30,
        top: 2,
        left: 2
      }));
      this.review_bar.add(this.image);
      this.review_bar.add(Ti.UI.createImageView({
        image: 'images/icons/comment.png',
        width: 18,
        height: 18,
        top: 225,
        left: 20
      }));
      this.comment = Ti.UI.createLabel({
        text: this.model.attributes.comment,
        color: "#000",
        font: {
          fontSize: 12,
          fontStyle: 'italic'
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        top: 225,
        left: 43,
        width: 240,
        height: 54
      });
      this.review_bar.add(this.comment);
      this.review_bar.add(Ti.UI.createImageView({
        image: 'images/icons/heart.png',
        width: 18,
        height: 18,
        top: 279,
        left: 20
      }));
      this.review_bar.add(Ti.UI.createLabel({
        text: '5 likes',
        color: "#000",
        font: {
          fontSize: 12,
          fontStyle: 'italic'
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        top: 279,
        left: 43,
        width: 50,
        height: 'auto',
        bottom: 5
      }));
      Ti.API.addEventListener('created:review:dish_' + this.model.attributes.dish_id, function() {
        Ti.API.debug('received created:review:dish_' + _this.model.attributes.dish_id);
        return _this.model.refetch();
      });
      return this.review_bar;
    };

    DishReviewView.prototype.tappableOverlay = function() {
      var overlay,
        _this = this;
      overlay = Ti.UI.createImageView({
        image: "images/icons/dark_camera@2x.png",
        opacity: 0.8,
        height: 'auto'
      });
      overlay.addEventListener('click', function() {
        return Ti.Media.openPhotoGallery({
          success: function(event) {
            var review;
            try {
              review = new Ti.Model.Review({
                dish_id: _this.model.attributes.dish_id,
                picture: Ti.ImageProcess.saveLocal(event.media)
              });
              return Ti.API.fireEvent('new:review', review);
            } catch (e) {
              return alert(e);
            }
          },
          cancel: function() {},
          error: function(error) {
            return Ti.API.error(error);
          }
        });
      });
      return this.image.add(overlay);
    };

    DishReviewView.prototype.refillContent = function() {
      Ti.API.debug("refill content for review " + this.model.attributes.id);
      this.image.image = decodeURIComponent(this.model.picture_url());
      Ti.API.debug(this.image.image);
      return this.comment.text = this.model.attributes.comment;
    };

    return DishReviewView;

  })(BaseView);

  module.exports = DishReviewView;

}).call(this);
