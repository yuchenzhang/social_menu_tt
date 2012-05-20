(function() {
  var MenuWindowController;

  MenuWindowController = (function() {

    function MenuWindowController(menu, user) {
      this.menu = menu;
      this.user = user;
      this.order = new Ti.Model.Order({
        restaurant_id: this.menu.restaurant.get('id'),
        user_id: this.user.get('id'),
        status: 'pending'
      });
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
      if (!this.menu.id) return;
      this.renderTopBar();
      this.renderUserBar();
      return this.renderDishStrip();
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
          _this.order_view = (new Ti.Controller.MenuOrderView(_this.order)).view;
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
      Ti.API.debug('render dishstrip');
      this.dish_strip || (this.dish_strip = Ti.UI.createTableView({
        backgroundImage: "images/wooden_floor.jpg",
        width: '100%',
        top: 70,
        showVerticalScrollIndicator: false
      }));
      rows = this.menu.dishes.map(function(dish) {
        return _this.createDishRow(dish);
      });
      this.dish_strip.setData(rows);
      return this.window.add(this.dish_strip);
    };

    MenuWindowController.prototype.createDishRow = function(dish) {
      var blob, description_bar, image, info_bar, my_order, name, plus_icon, price, review_bar, row, url,
        _this = this;
      row = Ti.UI.createTableViewRow({
        height: 'auto',
        layout: "vertical"
      });
      info_bar = Ti.UI.createView({
        backgroundColor: "#D8F6CE",
        width: "100%",
        height: 50,
        top: 0
      });
      name = Ti.UI.createLabel({
        color: "#900",
        font: {
          fontSize: 15,
          fontWeight: 'bold'
        },
        text: dish.get('name'),
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        width: 160,
        height: 30,
        top: 0,
        left: 12
      });
      price = Ti.UI.createLabel({
        color: "black",
        font: {
          fontSize: 13,
          fontStyle: "italic"
        },
        text: '€' + dish.get('price'),
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        width: 100,
        height: 30,
        top: 0,
        right: 60
      });
      plus_icon = Ti.UI.createImageView({
        image: "images/icons/add.png",
        width: 48,
        height: 48,
        top: 0,
        right: 10
      });
      plus_icon.addEventListener('click', function() {
        return _this.order.addDish(dish);
      });
      info_bar.add(name);
      info_bar.add(price);
      info_bar.add(plus_icon);
      my_order = null;
      this.order.on("change_dish:" + dish.id, function() {
        var minus_icon;
        if (my_order) {
          info_bar.remove(my_order);
          my_order = null;
        }
        if (!(dish.get('count') > 0)) return;
        my_order = Ti.UI.createView({
          color: "#fff",
          top: 32,
          left: 5,
          width: 100,
          height: 25,
          bottom: 5
        });
        my_order.add(Ti.UI.createLabel({
          color: "#000",
          font: {
            fontSize: 12,
            fontStyle: 'italic'
          },
          text: _this.user.get('name'),
          textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
          left: 10,
          width: 25,
          height: 25
        }));
        my_order.add(Ti.UI.createLabel({
          text: "+" + dish.get('count'),
          color: "#000",
          font: {
            fontSize: 14,
            fontStyle: 'italic'
          },
          textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
          width: 'auto',
          height: 'auto'
        }));
        minus_icon = Ti.UI.createImageView({
          image: "images/icons/remove.png",
          right: 10,
          width: 18,
          height: 18
        });
        my_order.add(minus_icon);
        minus_icon.addEventListener('click', function() {
          return _this.order.removeDish(dish);
        });
        return info_bar.add(my_order);
      });
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
        text: dish.get('description'),
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        width: 280,
        height: 'auto',
        top: 5,
        bottom: 5
      }));
      review_bar = Ti.UI.createView({
        width: '100%',
        height: 'auto',
        top: 5
      });
      review_bar.add(Ti.UI.createLabel({
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
      review_bar.add(Ti.UI.createLabel({
        color: "#000",
        font: {
          fontSize: 14,
          fontStyle: 'normal',
          fontWeight: 'bold'
        },
        text: dish.reviews.at(0).attributes.user_name,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        top: 5,
        left: 132,
        width: 'auto',
        height: 25
      }));
      url = decodeURIComponent(dish.reviews.at(0).picture_url());
      blob = Ti.ImageProcess.cropImage(url);
      image = Ti.UI.createImageView({
        image: blob,
        width: 290,
        height: 'auto',
        top: 38,
        right: 10
      });
      image.add(Ti.UI.createImageView({
        image: dish.reviews.at(0).attributes.user_avatar,
        width: 30,
        height: 30,
        top: 2,
        left: 2
      }));
      review_bar.add(image);
      review_bar.add(Ti.UI.createImageView({
        image: 'images/icons/comment.png',
        width: 18,
        height: 18,
        top: 185,
        left: 20
      }));
      review_bar.add(Ti.UI.createLabel({
        text: dish.reviews.at(0).attributes.comment,
        color: "#000",
        font: {
          fontSize: 12,
          fontStyle: 'italic'
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        top: 185,
        left: 43,
        width: 240,
        height: 54
      }));
      review_bar.add(Ti.UI.createImageView({
        image: 'images/icons/heart.png',
        width: 18,
        height: 18,
        top: 239,
        left: 20
      }));
      review_bar.add(Ti.UI.createLabel({
        text: '5 likes',
        color: "#000",
        font: {
          fontSize: 12,
          fontStyle: 'italic'
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        top: 239,
        left: 43,
        width: 50,
        height: 'auto',
        bottom: 5
      }));
      row.add(info_bar);
      row.add(description_bar);
      row.add(review_bar);
      this.order.on("change:status", function() {
        var overlay;
        Ti.API.debug("status chagned to " + _this.order.attributes.status);
        Ti.API.debug("ordered " + dish.attributes.name + " " + dish.attributes.count);
        if (_this.order.attributes.status === "confirmed" && parseInt(dish.attributes.count) > 0) {
          Ti.API.debug("making the overlay");
          overlay = Ti.UI.createImageView({
            image: "images/icons/dark_camera@2x.png",
            opacity: 0.8,
            width: 208,
            height: 'auto'
          });
          return image.add(overlay);
        }
      });
      return row;
    };

    return MenuWindowController;

  })();

  module.exports = MenuWindowController;

}).call(this);
