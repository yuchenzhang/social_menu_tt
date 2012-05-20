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
    it 'should not have default picture binary', ->
      expect(review.get 'picture_binary').toBeUndefined()
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
      it 'should not require an id', ->
        expect(review.set {id:null}).toBeTruthy()
    describe 'user_id', ->
    describe 'dish_id', ->
    describe 'comment', ->
      it 'should not accept a comment longer than 140 characters', ->
        expect(review.set {comment: 'Lorem ipsum dolor sit amet, iudicabit intellegebat sea at, sea minim elitr ad, pri ne eligendi adversarium conclusionemqueLorem ipsum dolor sit amet, iudicabit intellegebat sea at, sea minim elitr ad, pri ne eligendi adversarium conclusionemque'}).toBeFalsy()
      it 'should accept a comment within the 140 characters', ->
        expect(review.set {comment: 'Lorem ipsum dolor sit amet, iudicabit intellegebat sea at, sea minim elitr ad, pri ne eligendi adversarium conclusionemque'}).toBeTruthy()
    describe 'picture_binary', ->
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
      clearAjaxRequests()
    it 'should not send save request if a new record is without a picture binary', ->
      review = new Ti.Model.Review {
        id:null
        user_id:1
        dish_id:1
        comment:'blabla'
      }
      try
        review.save()
      expect(mostRecentAjaxRequest()).toBeNull()
    it 'should send save request for an existing record no matter the picture binary is set or not', ->
      review = new Ti.Model.Review {
        id:1
        user_id:1
        dish_id:1
        comment:'blabla'
      }
      try
        review.save()
      expect(mostRecentAjaxRequest()).not.toBeNull()
    it 'should send save request for a new record when its picture binary is set', ->
      review = new Ti.Model.Review {
        id:null
        user_id:1
        dish_id:1
        comment:'blabla'
        picture_binary: 'xxxxxx'
      }
      try
        review.save()
      expect(mostRecentAjaxRequest()).not.toBeNull()
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
      
