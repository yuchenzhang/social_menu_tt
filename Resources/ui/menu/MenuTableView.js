(function() {
  var MenuTableView;

  MenuTableView = (function() {

    function MenuTableView(dishes) {
      var bubble, currency, dish, dish_row, name, num, picture, price, recommends, reviews, row_view, rows, tableview, thumb, _len;
      rows = [];
      for (num = 0, _len = dishes.length; num < _len; num++) {
        dish = dishes[num];
        dish_row = Ti.UI.createTableViewRow({
          height: 60
        });
        row_view = Ti.UI.createView({
          width: 280,
          height: 60,
          left: 0
        });
        picture = Titanium.UI.createImageView({
          image: dish.picture,
          width: 100,
          height: 60,
          left: 1
        });
        name = Ti.UI.createLabel({
          text: dish.name,
          font: {
            fontSize: 16,
            fontWeight: 'bold'
          },
          textAlign: 'left',
          width: 120,
          height: 20,
          top: 2,
          left: 105
        });
        currency = Titanium.UI.createImageView({
          image: "/images/Titanium_Iconpack_1/light/light_coins.png",
          width: 20,
          height: 20,
          top: 2,
          right: 25
        });
        price = Ti.UI.createLabel({
          text: dish.price,
          font: {
            fontSize: 12,
            fontWeight: 'normal'
          },
          textAlign: 'right',
          width: 20,
          height: 20,
          top: 2,
          right: 2
        });
        thumb = Ti.UI.createImageView({
          image: "/images/Titanium_Iconpack_1/light/light_thumb-up.png",
          width: 20,
          height: 20,
          bottom: 3,
          right: 50
        });
        recommends = Ti.UI.createLabel({
          text: dish.recommends,
          font: {
            fontSize: 11,
            fontWeight: 'normal'
          },
          textAlign: 'right',
          width: 20,
          height: 20,
          bottom: 2,
          right: 40
        });
        bubble = Ti.UI.createImageView({
          image: "/images/Titanium_Iconpack_1/light/light_comment.png",
          width: 20,
          height: 20,
          bottom: 2,
          right: 15
        });
        reviews = Ti.UI.createLabel({
          text: dish.recommends,
          font: {
            fontSize: 11,
            fontWeight: 'normal'
          },
          textAlign: 'right',
          width: 20,
          height: 20,
          bottom: 2,
          right: 2
        });
        row_view.add(picture);
        row_view.add(name);
        row_view.add(currency);
        row_view.add(price);
        row_view.add(thumb);
        row_view.add(recommends);
        row_view.add(bubble);
        row_view.add(reviews);
        dish_row.add(row_view);
        rows.push(dish_row);
      }
      tableview = Titanium.UI.createTableView({
        data: rows
      });
      return tableview;
    }

    return MenuTableView;

  })();

  module.exports = MenuTableView;

}).call(this);
