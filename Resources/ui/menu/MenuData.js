(function() {
  var MenuData;

  MenuData = (function() {

    function MenuData() {
      var menu_data;
      menu_data = {
        resto: "SoHo",
        address: "Stationplein 10 Eindhoven",
        avatar: "http://placehold.it/120x120",
        currency: "EU",
        dishes: [
          {
            name: "Unagi",
            picture: "http://placehold.it/100x60",
            price: 10,
            recommends: 5,
            reviews: 3
          }, {
            name: "Tokyo Beef",
            picture: "http://placehold.it/100x60",
            price: 20,
            recommends: 5,
            reviews: 3
          }, {
            name: "Miso soup",
            picture: "http://placehold.it/100x60",
            price: 8,
            recommends: 5,
            reviews: 3
          }, {
            name: "Thai Prawn",
            picture: "http://placehold.it/100x60",
            price: 15,
            recommends: 5,
            reviews: 3
          }, {
            name: "Thai Prawn2",
            picture: "http://placehold.it/100x60",
            price: 15,
            recommends: 5,
            reviews: 3
          }, {
            name: "Thai Prawn3",
            picture: "http://placehold.it/100x60",
            price: 15,
            recommends: 5,
            reviews: 3
          }, {
            name: "Thai Prawn4",
            picture: "http://placehold.it/100x60",
            price: 15,
            recommends: 5,
            reviews: 3
          }, {
            name: "Thai Prawn5",
            picture: "http://placehold.it/100x60",
            price: 15,
            recommends: 5,
            reviews: 3
          }
        ]
      };
      return menu_data;
    }

    return MenuData;

  })();

  module.exports = MenuData;

}).call(this);
