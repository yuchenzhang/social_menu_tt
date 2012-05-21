class BaseView
  events:
    foo: 'bar'
    
  constructor: (model)->
    @model = model
    _.each @events, (func, event)=>
      @model.bind event, this[func]  
    @foo_count = 0
    
  bar: =>
    @foo_count++

module.exports = BaseView