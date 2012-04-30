(function() {

  if (Ti.App.test_enabled) {
    Ti.include('../lib/jasmine-1.0.2.js');
    Ti.include('../lib/jasmine-titanium.js');
    Ti.include('../lib/mock-ajax.js');
    Ti.include('models/UserSpec.js');
    Ti.include('models/MenuSpec.js');
    Ti.include('models/DishSpec.js');
    Ti.include('models/RestaurantSpec.js');
    Ti.include('models/PictureSpec.js');
    jasmine.getEnv().addReporter(new jasmine.TitaniumReporter());
    jasmine.getEnv().execute();
  }

}).call(this);
