# use test db
Ti.DB = _.extend Ti.DB, {name: 'socialmenuDBTest'}

Ti.include('../lib/jasmine-1.0.2.js')
Ti.include('../lib/jasmine-titanium.js')
Ti.include('../lib/mock-ajax.js') 
  
 # // Include all the test files
# Ti.include('models/UserSpec.js')
# Ti.include('models/MenuSpec.js')
# Ti.include('models/DishSpec.js')
# Ti.include('models/RestaurantSpec.js')
Ti.include('models/OrderSpec.js')
# Ti.include('models/DBSpec.js')
# Ti.include('models/ReviewSpec.js')
#  
# Ti.include('views/BaseViewSpec.js')
jasmine.getEnv().addReporter(new jasmine.TitaniumReporter())
jasmine.getEnv().execute()