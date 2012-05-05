(function() {
  var OrderWindowController;

  OrderWindowController = (function() {

    function OrderWindowController(order, user) {
      this.order = order;
      this.user = user;
      this.window = Ti.UI.createWindow({
        title: 'Order',
        navBarHidden: true,
        backgroundImage: "images/wooden_floor.jpg"
      });
      this.render();
    }

    OrderWindowController.prototype.render = function() {
      this.renderTopBar();
      return this.renderDishStrip();
    };

    OrderWindowController.prototype.renderTopBar = function() {
      var avatar, back_btn, name, price, send_btn,
        _this = this;
      this.top_bar || (this.top_bar = Ti.UI.createView({
        backgroundImage: "images/menu_background_1.jpg",
        width: "100%",
        height: 35,
        top: 0
      }));
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
        return delete _this;
      });
      this.top_bar.add(back_btn);
      avatar = Ti.UI.createImageView({
        image: this.user.get('avatar'),
        width: 25,
        height: 25,
        left: 145
      });
      this.top_bar.add(avatar);
      name = Ti.UI.createLabel({
        color: "white",
        font: {
          fontSize: 15
        },
        text: this.user.get('name'),
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        width: 80,
        height: 25,
        left: 185
      });
      this.top_bar.add(name);
      price = Ti.UI.createLabel({
        color: "black",
        font: {
          fontSize: 13,
          fontStyle: "italic"
        },
        text: '€' + this.order.totalPrice(),
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        width: 100,
        height: 30,
        top: 0,
        right: 60
      });
      this.order.dishes.on('change', function() {
        Ti.API.debug("dishes changed");
        return price.text = '€' + _this.order.totalPrice();
      });
      this.top_bar.add(price);
      send_btn = Titanium.UI.createButton({
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
        title: 'send',
        right: 5
      });
      this.top_bar.add(send_btn);
      send_btn.addEventListener('click', function() {
        _this.order.on("error", function(model) {
          return Ti.API.error('error to save:' + model.toJSON());
        });
        return _this.order.save();
      });
      return this.window.add(this.top_bar);
    };

    OrderWindowController.prototype.renderDishStrip = function() {
      var rows,
        _this = this;
      this.dish_strip || (this.dish_strip = Ti.UI.createTableView({
        backgroundImage: "images/wooden_floor.jpg",
        width: '100%',
        top: 35,
        showVerticalScrollIndicator: false
      }));
      rows = this.order.dishes.map(function(dish) {
        return _this.createRowOfType(dish);
      });
      this.dish_strip.setData(rows);
      return this.window.add(this.dish_strip);
    };

    OrderWindowController.prototype.createRowOfType = function(dish) {
      var blob, description, image_bar, info_bar, minus_icon, my_order, name, plus_icon, price, review_bar, row, url,
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
      my_order = Ti.UI.createView({
        color: "#fff",
        top: 5,
        left: 5,
        width: 100,
        height: "auto",
        bottom: 5
      });
      my_order.add(Ti.UI.createImageView({
        image: this.user.get('avatar'),
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
      row.add(my_order);
      this.order.on("change_dish:" + dish.id, function() {
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

    return OrderWindowController;

  })();

  module.exports = OrderWindowController;

}).call(this);
