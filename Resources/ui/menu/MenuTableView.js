(function() {
  var MenuTableView;

  MenuTableView = (function() {

    function MenuTableView(dishes) {
      var currency, dish, dish_row, name, num, picture, price, row_view, rows, tableview, _len;
      rows = [];
      for (num = 0, _len = dishes.length; num < _len; num++) {
        dish = dishes[num];
        dish_row = Ti.UI.createTableViewRow({
          height: 60
        });
        row_view = Ti.UI.createView({
          width: 280,
          height: 60,
          left: 0,
          borderColor: 'black'
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
          right: 40
        });
        price = Ti.UI.createLabel({
          text: dish.price,
          font: {
            fontSize: 12,
            fontWeight: 'bold'
          },
          textAlign: 'right',
          width: 20,
          height: 20,
          top: 2,
          right: 18
        });
        row_view.add(picture);
        row_view.add(name);
        row_view.add(currency);
        row_view.add(price);
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
