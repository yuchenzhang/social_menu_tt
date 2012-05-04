init = ->  
  Ti.App = 
    endpoint: "http://localhost:8000"
    test_enabled: false
  
  Ti.Model = 
    Picture: require "models/Picture"
    PictureCollection: require "models/PictureCollection"
    Dish: require "models/Dish"
    DishCollection: require "models/DishCollection"
    Menu: require "models/Menu"
    Restaurant: require "models/Restaurant"
    User: require "models/User"
    Order: require "models/Order"
    
  Ti.DB = 
    Util: require "models/DB"
    name: 'socialmenuDB'
    
  Ti.Controller =
    LoginWindow: require 'controllers/LoginWindowController'
    TabGroup: require 'controllers/TabGroupController'
    HomeWindow: require "controllers/HomeWindowController"
    MenuWindow: require "controllers/MenuWindowController"
    CouponWindow: require "controllers/CouponWindowController"
    MemoWindow: require "controllers/MemoWindowController"
         
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

