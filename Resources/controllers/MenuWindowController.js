(function() {
  var MenuWindowController;

  MenuWindowController = (function() {

    function MenuWindowController(menu, user) {
      this.menu = menu;
      this.user = user;
      this.order = new Ti.Model.Order({
        user_id: this.user.attributes.id,
        restaurant_id: this.menu.restaurant.attributes.id,
        status: 'pending'
      }, menu.dishes);
      this.window = Ti.UI.createWindow({
        title: 'SocialMenu menupage',
        backgroundImage: "images/wooden_floor.jpg",
        navBarHidden: true
      });
      this.render();
      this.guide_view = null;
      this.order_view = null;
    }

    MenuWindowController.prototype.render = function() {
      var _this = this;
      if (!this.menu.id) return;
      this.renderTopBar();
      this.renderUserBar();
      this.renderDishStrip();
      return Ti.API.addEventListener('new:review', function(review) {
        Ti.API.debug("new review: " + JSON.stringify(review));
        if (_this.new_review_view) {
          return _this.new_review_view.reset(review);
        } else {
          Ti.API.debug("picture: " + review.attributes.picture_binary);
          _this.new_review_view = new Ti.View.DishReviewComposeView(review);
          return _this.window.add(_this.new_review_view.render());
        }
      });
    };

    MenuWindowController.prototype.renderTopBar = function() {
      var back_btn, guide_btn, order_btn,
        _this = this;
      this.top_bar || (this.top_bar = Ti.UI.createView({
        backgroundImage: "images/menu_background_1.jpg",
        width: "100%",
        height: 35,
        top: 0
      }));
      order_btn = Ti.UI.createButton({
        color: '#fff',
        backgroundImage: 'images/BUTT_grn_off.png',
        backgroundSelectedImage: 'images/BUTT_grn_on.png',
        backgroundDisabledImage: 'images/BUTT_drk_off.png',
        width: 50,
        height: 30,
        font: {
          fontSize: 14,
          fontWeight: 'bold',
          fontFamily: 'Helvetica Neue'
        },
        title: 'Order',
        right: 5
      });
      this.top_bar.add(order_btn);
      order_btn.addEventListener('click', function() {
        if (_this.order_view) {
          return _this.order_view.show();
        } else {
          _this.order_view = (new Ti.View.OrderView(_this.order)).render();
          return _this.window.add(_this.order_view);
        }
      });
      guide_btn = Ti.UI.createButton({
        color: "#fff",
        backgroundImage: 'images/BUTT_grn_off.png',
        backgroundSelectedImage: 'images/BUTT_grn_on.png',
        backgroundDisabledImage: 'images/BUTT_drk_off.png',
        width: 50,
        height: 30,
        font: {
          fontSize: 14,
          fontWeight: 'bold',
          fontFamily: 'Helvetica Neue'
        },
        title: 'Guide',
        right: 130
      });
      this.top_bar.add(guide_btn);
      guide_btn.addEventListener('click', function() {
        if (_this.guide_view) {
          return _this.guide_view.show();
        } else {
          _this.guide_view = (new Ti.Controller.MenuGuideView(_this.menu)).view;
          return _this.window.add(_this.guide_view);
        }
      });
      back_btn = Ti.UI.createButton({
        color: "#000",
        backgroundImage: 'images/BUTT_gry_off.png',
        backgroundSelectedImage: 'images/BUTT_gry_on.png',
        backgroundDisabledImage: 'images/BUTT_drk_off.png',
        width: 50,
        height: 30,
        font: {
          fontSize: 14,
          fontWeight: 'bold',
          fontFamily: 'Helvetica Neue'
        },
        title: 'back',
        left: 5
      });
      this.top_bar.add(back_btn);
      back_btn.addEventListener('click', function() {
        _this.window.close();
        _this.menu.set({
          id: null
        });
        return delete _this;
      });
      return this.window.add(this.top_bar);
    };

    MenuWindowController.prototype.renderUserBar = function() {
      var avatar, name, order_status,
        _this = this;
      this.user_bar || (this.user_bar = Ti.UI.createView({
        backgroundColor: "transparent",
        width: "100%",
        height: 35,
        top: 35
      }));
      avatar = Ti.UI.createImageView({
        image: this.user.get('avatar'),
        width: 25,
        height: 25,
        left: 10
      });
      this.user_bar.add(avatar);
      name = Ti.UI.createLabel({
        color: "white",
        font: {
          fontSize: 15
        },
        text: this.user.get('name'),
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        width: 80,
        height: 25,
        left: 40
      });
      this.user_bar.add(name);
      order_status = Ti.UI.createLabel({
        color: "white",
        font: {
          fontSize: 15
        },
        text: 'order ' + this.order.attributes.status,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        width: 160,
        height: 25,
        right: 5
      });
      this.order.on("change:status", function() {
        return order_status.text = 'order ' + _this.order.attributes.status;
      });
      this.user_bar.add(order_status);
      return this.window.add(this.user_bar);
    };

    MenuWindowController.prototype.renderDishStrip = function() {
      var rows,
        _this = this;
      this.dish_strip || (this.dish_strip = Ti.UI.createTableView({
        backgroundImage: "images/wooden_floor.jpg",
        width: '100%',
        top: 70,
        showVerticalScrollIndicator: false
      }));
      rows = this.menu.dishes.map(function(dish) {
        return (new Ti.View.DishRowView(dish)).render();
      });
      this.dish_strip.setData(rows);
      return this.window.add(this.dish_strip);
    };

    return MenuWindowController;

  })();

  module.exports = MenuWindowController;

}).call(this);
