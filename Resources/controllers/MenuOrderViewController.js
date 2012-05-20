(function() {
  var MenuOrderViewController;

  MenuOrderViewController = (function() {

    function MenuOrderViewController(order) {
      var back_btn, data, send_btn,
        _this = this;
      this.order = order;
      Ti.API.debug('order created with status ' + this.order.attributes.status);
      this.view = Ti.UI.createView({
        width: 300,
        height: 400,
        backgroundColor: '#777',
        opacity: 0.8,
        top: 5
      });
      data = this.order.dishes.map(function(dish) {
        return {
          title: dish.attributes.name + ' x ' + dish.attributes.count
        };
      });
      this.list = Ti.UI.createTableView({
        data: data,
        scrollable: true,
        height: 350,
        width: 280,
        top: 2
      });
      this.view.add(this.list);
      this.order.dishes.on('change', function() {
        data = _this.order.dishes.map(function(dish) {
          return {
            title: dish.attributes.name + ' x ' + dish.attributes.count
          };
        });
        return _this.list.setData(data);
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
        _this.order.save({
          status: 'submitted'
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
    }

    return MenuOrderViewController;

  })();

  module.exports = MenuOrderViewController;

}).call(this);
