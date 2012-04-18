(function() {
  var MenuWindowController;

  MenuWindowController = (function() {

    function MenuWindowController(menu) {
      var _this = this;
      this.menu = menu;
      this.window = Ti.UI.createWindow({
        title: 'SocialMenu menupage',
        backgroundColor: 'white'
      });
      this.render();
      this.menu.bind("data:refetched", function() {
        return _this.render();
      });
    }

    MenuWindowController.prototype.render = function() {
      var _this = this;
      if (!this.menu.id) return;
      if (this.name) {
        this.name.setText(this.menu.restaurant.get('name'));
      } else {
        this.name = Ti.UI.createLabel({
          text: this.menu.restaurant.get('name'),
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
        this.window.add(this.name);
      }
      if (!this.closeButton) {
        this.closeButton = Ti.UI.createButton({
          title: 'Close',
          textAlign: 'center',
          color: '#000',
          backgroundColor: '#fff',
          style: 0,
          font: {
            fontWeight: 'bold',
            fontSize: 16
          },
          borderColor: '#000',
          borderRadius: 10,
          borderWidth: 1,
          opacity: 0.5,
          width: 220,
          height: 30,
          top: 20
        });
        this.closeButton.addEventListener('click', function() {
          return _this.window.close();
        });
        this.window.add(this.closeButton);
      }
      return this.window.open();
    };

    return MenuWindowController;

  })();

  module.exports = MenuWindowController;

}).call(this);
