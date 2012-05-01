(function() {

  if (Ti.App.test_enabled) {
    Ti.include('../lib/jasmine-1.0.2.js');
    Ti.include('../lib/jasmine-titanium.js');
    Ti.include('../lib/mock-ajax.js');
    Ti.include('models/OrderSpec.js');
    jasmine.getEnv().addReporter(new jasmine.TitaniumReporter());
    jasmine.getEnv().execute();
  }

}).call(this);
