describe 'Review model', ->
  review = null
  beforeEach ->
    review = new Ti.Model.Review
    jasmine.Ajax.useMock()
    
  describe 'default attributes', ->
    it 'should have default id', ->
      expect(review.get 'id').toBeDefined()
    it 'should have default user_id', ->
      expect(review.get 'user_id').toBeDefined()
    it 'should have default dish_id', ->
      expect(review.get 'dish_id').toBeDefined()
    it 'should have default comment', ->
      expect(review.get 'comment').toBeDefined()
  describe 'validations', ->
    beforeEach ->
      review = new Ti.Model.Review {
        id: 1
        user_id: 1
        dish_id: 1
        comment: 'blabla'
      }
      review.bind 'error', (model,error)->
        Ti.API.error "error:" + error
    it 'should be valid', ->
      expect(review.isValid(true)).toBeTruthy()
    describe 'id', ->
      it 'should not require an id', ->
        expect(review.set {id:null}).toBeTruthy()
    describe 'user_id', ->
    describe 'dish_id', ->
    describe 'comment', ->
      it 'should not accept a comment longer than 140 characters', ->
        expect(review.set {comment: 'Lorem ipsum dolor sit amet, iudicabit intellegebat sea at, sea minim elitr ad, pri ne eligendi adversarium conclusionemqueLorem ipsum dolor sit amet, iudicabit intellegebat sea at, sea minim elitr ad, pri ne eligendi adversarium conclusionemque'}).toBeFalsy()
      it 'should accept a comment within the 140 characters', ->
        expect(review.set {comment: 'Lorem ipsum dolor sit amet, iudicabit intellegebat sea at, sea minim elitr ad, pri ne eligendi adversarium conclusionemque'}).toBeTruthy()
    describe 'picture_url', ->
      
  describe 'rest url', ->
    it 'should have the url to save a new record', ->
      review = new Ti.Model.Review {
        id: null
        dish_id: 2
        user_id: 3
      }
      expect(review.url()).toEqual Ti.App.endpoint + '/dishes/2/reviews'
    it 'should have the url to update an existing record', ->  
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
        review.bind 'error', (model,error)->
          Ti.API.error "error:" + error
      it 'should set picture binary', ->
        f = Ti.Filesystem.getFile 'images/olive.jpg'
        blob = Ti.Utils.base64encode(f.read()).text
        review.set {picture_binary: blob}
        expect(review.get 'picture_binary').toEqual blob
      
      it 'should save a new review and update the returned user_id and id', ->
        review.save(null,{
          success: (model,resp)->
            model.set {saved_at: '2011-3-3 11:21:22'}
        })
        request = mostRecentAjaxRequest()
        request.response({
          status: 201
          responseText: JSON.stringify({
            id: 9
            user_id: 10
            dish_id: 1
            comment: 'blabla'
          })
        })
        expect(review.attributes.id).toEqual 9
        expect(review.attributes.user_id).toEqual 10
        expect(review.attributes.dish_id).toEqual 1
        expect(review.attributes.saved_at).toEqual '2011-3-3 11:21:22'   
    # beforeEach ->
      # review = new Ti.Model.Review {
        # id: null
        # user_id: 1
        # dish_id: 1
        # comment: 'blabla'
      # }
    # it 'should save', ->
      # try 
        # f = Ti.Filesystem.getFile 'images/olive.jpg'
        # review.set {picture_binary: Titanium.Utils.base64encode(f.read()).text}
        # review.save()
      # catch e
        # Ti.API.error e    
      
