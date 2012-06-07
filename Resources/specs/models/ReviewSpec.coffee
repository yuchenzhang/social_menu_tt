describe 'Review model', ->
  review = null
  beforeEach ->
    review = new Ti.Model.Review
    jasmine.Ajax.useMock()
    
  describe 'attributes', ->
    it 'should have default rewritable false', ->
      expect(review.attributes.rewritable).toBeFalsy()
 
  describe 'validations', ->
    beforeEach ->
      review = new Ti.Model.Review {
        id: 1
        user_id: 1
        dish_id: 1
        comment: 'blabla'
      }
    it 'should be valid', ->
      expect(review.isValid(true)).toBeTruthy()
    describe 'id', ->
      it 'should be validated as a id pattern', ->
        expect(review.set {id:'abc'}).toBeFalsy()
    describe 'user_id', ->
      it 'should be validated as a id pattern', ->
        expect(review.set {user_id: 'abc'}).toBeFalsy()
    describe 'dish_id', ->
      it 'should be required', ->
        expect(review.set {dish_id:null}).toBeFalsy()
      it 'should be validated as a id pattern', ->
        expect(review.set {dish_id: 'abc'}).toBeFalsy()
    describe 'comment', ->
      it 'should not accept a comment longer than 140 characters', ->
        expect(review.set {comment: 'Lorem ipsum dolor sit amet, iudicabit intellegebat sea at, sea minim elitr ad, pri ne eligendi adversarium conclusionemqueLorem ipsum dolor sit amet, iudicabit intellegebat sea at, sea minim elitr ad, pri ne eligendi adversarium conclusionemque'}).toBeFalsy()
      it 'should accept a comment within the 140 characters', ->
        expect(review.set {comment: 'Lorem ipsum dolor sit amet, iudicabit intellegebat sea at, sea minim elitr ad, pri ne eligendi adversarium conclusionemque'}).toBeTruthy()
  
    
  describe 'url', ->
    it 'should return the url to save a new record when id not set', ->
      review = new Ti.Model.Review {
        id: null
        dish_id: 2
        user_id: 3
      }
      expect(review.url()).toEqual Ti.App.endpoint + '/dishes/2/reviews'
    it 'should return the url to update an existing record when id is set', ->  
      review = new Ti.Model.Review {
        id: 1
        dish_id: 2
        user_id: 3
      }
      expect(review.url()).toEqual Ti.App.endpoint + '/dishes/2/reviews/1'
  
  describe 'save', ->
    beforeEach ->
      review = new Ti.Model.Review
        user_id: 1
        dish_id: 1
        comment: 'blabla'
    it 'should set picture binary', ->
      f = Ti.Filesystem.getFile 'images/olive.jpg'
      blob = Ti.Utils.base64encode(f.read()).text
      review.set {picture_binary: blob}
      expect(review.attributes.picture_binary).toEqual blob
    
    it 'should save a new review and update the returned user_id and id but not change the dish_id', ->
      review.save(null,{
        success: (model,resp)->
          model.set {saved_at: '2011-3-3 11:21:22'}
      })
      request = mostRecentAjaxRequest()
      request.response {
        status: 201
        responseText: JSON.stringify {
          id: 9
          user: {id:10}
          dish: {id:2}
          comment: 'blabla'
        }
      }
      expect(review.attributes.id).toEqual 9
      expect(review.attributes.user_id).toEqual 10
      expect(review.attributes.dish_id).toEqual 1
      expect(review.attributes.saved_at).toEqual '2011-3-3 11:21:22' 
      
  describe 'refetch', ->
    beforeEach ->
      review = new Ti.Model.Review
        id: 1
        user_id: 1
        dish_id :1
        comment: 'blabla'
    it 'should set the id temporarily to -1', ->
      review.refetch()
      expect(review.attributes.id).toEqual -1
    it 'should update the comment and trigger refetched event when success', ->
      spyOn review, 'trigger'
      review.refetch()
      mostRecentAjaxRequest().response {
        status: 200
        responseText: JSON.stringify {
          id: 1
          user:{id:10}
          dish:{id:1}
          comment: 'woohooo'
        }
      }
      expect(review.attributes.comment).toEqual 'woohooo'
      expect(review.trigger).toHaveBeenCalledWith 'review:refetched'  
