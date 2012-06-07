describe 'DishReviewComposeView', ->
  review = null
  view = null
  beforeEach ->    
    review = new Ti.Model.Review
      picture: (Ti.Filesystem.getFile 'images/olive.jpg').nativePath
      dish_id: 1 
    view = new Ti.View.DishReviewComposeView review
    view.render()
      
  it 'should render the review image and dish', ->
    expect(view.image.image.text).toEqual (Ti.ImageProcess.cropImage 'images/olive.jpg').text
    expect(view.model.attributes.dish_id).toEqual 1

  it 'should reset with a review with new image and dish', ->
    review = new Ti.Model.Review
      picture: (Ti.Filesystem.getFile 'images/sashimi.jpg').nativePath
      dish_id: 2
    view.reset review
    expect(view.model.attributes.picture).toEqual (Ti.Filesystem.getFile 'images/sashimi.jpg').nativePath
    expect(view.image.image.text).toEqual (Ti.ImageProcess.cropImage 'images/olive.jpg').text 
    expect(view.model.attributes.dish_id).toEqual 2
