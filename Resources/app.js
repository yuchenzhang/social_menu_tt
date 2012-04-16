(function() {
  var MainController;

  if (Ti.version < 1.8) {
    alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
  } else if (Ti.Platform.osname === 'mobileweb') {
    alert('Mobile web is not yet supported by this template');
  } else {
    Ti.App = {
      endpoint: "http://localhost:8000"
    };
    MainController = require('controllers/MainController');
    new MainController();
  }

}).call(this);
