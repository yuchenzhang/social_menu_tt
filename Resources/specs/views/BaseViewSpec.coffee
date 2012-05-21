describe 'BaseView', ->
  view = null
  model = null
  beforeEach ->
    model = new Backbone.Model
    view = new Ti.View.BaseView model
  it 'should assign a model', ->
    expect(view.model).toBe model
  it 'should delegate event handling', ->
    expect(view.foo_count).toEqual 0
    model.trigger 'foo'
    expect(view.foo_count).toEqual 1
