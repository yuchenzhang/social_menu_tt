BaseView = require 'views/BaseView'
class TimelineView extends BaseView
  
  events:
    'timeline:refetched': 'renderList'
  
  review_strip: null
  
  render: ->
    view = Ti.UI.createView
      width: 320
      height: 480
      backgroundColor: "#ffa"
      top: 10
      
    @review_strip = Ti.UI.createTableView
      backgroundImage: "images/wooden_floor.jpg"
      width: '100%'
      showVerticalScrollIndicator: false  
    @renderList()
    view.add @review_strip
    return view
  
  renderList: =>
    rows = @model.reviews.map (re)=>
      row = Ti.UI.createTableViewRow
        height: 'auto'
        layout: "vertical"
        className: 'timeline_row'
      row.add (new Ti.View.DishReviewView(re)).render()
      return row
    @review_strip.setData rows

module.exports = TimelineView    
  