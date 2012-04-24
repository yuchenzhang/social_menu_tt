(function() {
  var init;

  init = function() {
    var TabGroupController;
    Ti.App = {
      endpoint: "http://10.0.1.2:8000"
    };
    TabGroupController = require('controllers/TabGroupController');
    return new TabGroupController();
  };

  if (Ti.version < 1.8) {
    alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
  } else if (Ti.Platform.osname === 'mobileweb') {
    alert('Mobile web is not yet supported by this template');
  } else {
    init();
  }

}).call(this);
