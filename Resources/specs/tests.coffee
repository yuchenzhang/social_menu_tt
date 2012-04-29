if Ti.App.test_enabled
   Ti.API.debug "in test"
   Ti.include('../lib/jasmine-1.0.2.js')
   Ti.include('../lib/jasmine-titanium.js')
    
    # // Include all the test files
   Ti.include('../specs/UserSpec.js')
    
   jasmine.getEnv().addReporter(new jasmine.TitaniumReporter())
   jasmine.getEnv().execute()