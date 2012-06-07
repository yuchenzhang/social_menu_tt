init = ->  
  Ti.App = 
    endpoint: "http://localhost:8000"
    # endpoint: "http://192.168.1.12:8000"
    # endpoint: "http://192.168.1.5:8000"
    # endpoint: "http://www.socialmenu.fm"
    test_enabled: true
  
  Ti.Model = 
    BaseModel: require "models/Base"
    Dish: require "models/Dish"
    DishCollection: require "models/DishCollection"
    Menu: require "models/Menu"
    Restaurant: require "models/Restaurant"
    User: require "models/User"
    Order: require "models/Order"
    Review: require "models/Review"
    ReviewCollection: require "models/ReviewCollection"
    Timeline: require "models/Timeline"
    
  Ti.DB = 
    Util: require "helper/DB"
    name: 'socialmenuDB'
  
  Ti.ImageProcess = require "helper/ImageProcess"
    
  Ti.Controller =
    LoginWindow: require 'controllers/LoginWindowController'
    TabGroup: require 'controllers/TabGroupController'
    HomeWindow: require "controllers/HomeWindowController"
    MenuWindow: require "controllers/MenuWindowController"
    TimelineWindow: require "controllers/TimelineWindowController"
    TrendingWindow: require "controllers/TrendingWindowController"
    MessageWindow: require "controllers/MessageWindowController"
    ProfileWindow: require "controllers/ProfileWindowController"
  
  Ti.View =
    BaseView: require 'views/BaseView'
    UserFormView: require 'views/UserFormView'
    DishRowView: require 'views/DishRowView'
    DishReviewView: require 'views/DishReviewView'
    OrderView: require 'views/OrderView'
    DishReviewComposeView: require 'views/DishReviewComposeView'
    TimelineView: require 'views/TimelineView'
         
  if Ti.App.test_enabled
    Ti.include "specs/tests.js"
  else
    new Ti.Controller.LoginWindow
  
if Ti.version < 1.8
  alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later')
else if Ti.Platform.osname == 'mobileweb'
  alert('Mobile web is not yet supported by this template')
else
  Ti.include "lib/underscore.js"
  Ti.include "lib/backbone.js"
  Ti.include "lib/tiajax.js"
  Ti.include "lib/backbone.validation.js"
  _.extend(Backbone.Model.prototype, Backbone.Validation.mixin)
  init()  

