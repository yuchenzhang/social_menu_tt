Dish = require 'models/Dish'
class DishCollection extends Backbone.Collection
  model: Dish
  
module.exports = DishCollection