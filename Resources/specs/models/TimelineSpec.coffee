describe 'Timeline model', ->
  timeline = null
  beforeEach ->
    timeline = new Ti.Model.Timeline
    jasmine.Ajax.useMock()
  
  describe 'fetch', ->  
    it 'should reset reviews when success', ->
      spyOn timeline, 'trigger'
      timeline.fetch()
      mostRecentAjaxRequest().response {
        status: 200
        responseText: JSON.stringify { 
          reviews: [
            {
              id: 1
              comment: 'bla'
              picture: 'https://www.socialmenu.fm/roast_duck.jpg'
              user:{id:2,name:'jack',avatar:'https://www.socialmenu.fm/jack.png'}
              dish:{id:3,name:'roast duck'}
            }
          ]
        }
      }
      expect(timeline.reviews.length).toEqual 1
      expect(timeline.reviews.at(0).attributes.comment).toEqual 'bla'
      expect(timeline.trigger).toHaveBeenCalledWith 'timeline:refetched' 
