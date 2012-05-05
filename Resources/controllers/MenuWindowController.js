(function() {
  var MenuWindowController;

  MenuWindowController = (function() {

    function MenuWindowController(menu, user) {
      this.menu = menu;
      this.user = user;
      this.order = new Ti.Model.Order({
        restaurant_id: this.menu.restaurant.get('id'),
        user_id: this.user.get('id')
      });
      this.window = Ti.UI.createWindow({
        title: 'SocialMenu menupage',
        backgroundImage: "images/wooden_floor.jpg",
        navBarHidden: true
      });
      this.render();
    }

    MenuWindowController.prototype.render = function() {
      if (!this.menu.id) return;
      this.renderTopBar();
      return this.renderDishStrip();
    };

    MenuWindowController.prototype.renderTopBar = function() {
      var avatar, back_btn, checkout_btn, name,
        _this = this;
      this.top_bar || (this.top_bar = Ti.UI.createView({
        backgroundImage: "images/menu_background_1.jpg",
        width: "100%",
        height: 35,
        top: 0
      }));
      checkout_btn = Titanium.UI.createButton({
        color: '#fff',
        backgroundImage: 'images/BUTT_grn_off.png',
        backgroundSelectedImage: 'images/BUTT_grn_on.png',
        backgroundDisabledImage: 'images/BUTT_drk_off.png',
        width: 150,
        height: 30,
        font: {
          fontSize: 14,
          fontWeight: 'bold',
          fontFamily: 'Helvetica Neue'
        },
        title: 'Check my orders',
        right: 5
      });
      this.top_bar.add(checkout_btn);
      checkout_btn.addEventListener('click', function() {
        var order_window;
        order_window = (new Ti.Controller.OrderWindow(_this.order, _this.user)).window;
        order_window.containingTab = _this.window.containingTab;
        return _this.window.containingTab.open(order_window);
      });
      back_btn = Titanium.UI.createButton({
        color: "black",
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
      this.window.add(this.top_bar);
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
        return _this.createRowOfType(dish);
      });
      this.dish_strip.setData(rows);
      return this.window.add(this.dish_strip);
    };

    MenuWindowController.prototype.createRowOfType = function(dish) {
      var blob, description, image_bar, info_bar, my_order, name, plus_icon, price, review_bar, row, url,
        _this = this;
      url = decodeURIComponent(dish.pictures.at(0).url());
      blob = Ti.ImageProcess.cropImageForMenuView(url);
      row = Ti.UI.createTableViewRow({
        height: 'auto',
        layout: "vertical"
      });
      info_bar = Ti.UI.createView({
        backgroundColor: "#D8F6CE",
        width: "100%",
        height: 30,
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
        right: 12
      });
      image_bar = Ti.UI.createView({
        backgroundImage: blob,
        width: '100%',
        height: 140,
        borderWidth: 10,
        borderColor: 'white',
        top: 5
      });
      plus_icon = Ti.UI.createImageView({
        image: "images/icons/add.png",
        width: 50,
        height: 50,
        top: 10,
        right: 10
      });
      image_bar.add(plus_icon);
      review_bar = Ti.UI.createView({
        color: "#fff",
        width: 300,
        top: 5,
        height: 'auto',
        borderColor: "#bdbdbd",
        borderRadius: 10
      });
      description = Ti.UI.createLabel({
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
      });
      plus_icon.addEventListener('click', function() {
        return _this.order.addDish(dish);
      });
      info_bar.add(name);
      info_bar.add(price);
      review_bar.add(description);
      row.add(info_bar);
      row.add(image_bar);
      row.add(review_bar);
      my_order = null;
      this.order.on("change_dish:" + dish.id, function() {
        var minus_icon;
        Ti.API.debug(_this.order.toJSON());
        if (my_order) row.remove(my_order);
        if (!(dish.get('count') > 0)) return;
        my_order = Ti.UI.createView({
          color: "#fff",
          top: 5,
          left: 5,
          width: 100,
          height: "auto",
          bottom: 5
        });
        my_order.add(Ti.UI.createImageView({
          image: _this.user.get('avatar'),
          left: 10,
          width: 25,
          height: 25
        }));
        my_order.add(Ti.UI.createLabel({
          text: "+" + dish.get('count'),
          color: "#000",
          font: {
            fontSize: 14,
            fontStyle: 'normal',
            fontWeight: "bold"
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
        return row.add(my_order);
      });
      return row;
    };

    return MenuWindowController;

  })();

  module.exports = MenuWindowController;

}).call(this);
