describe 'DishReviewComposeView', ->
  review = null
  view = null
  beforeEach ->    
    review = new Ti.Model.Review
      picture_binary: (Ti.Filesystem.getFile 'images/olive.jpg').read() 
      dish_id: 1 
    view = new Ti.View.DishReviewComposeView review
    view.render()
      
  it 'should render the review image and dish', ->
    expect(view.image.image).toEqual Ti.ImageProcess.cropImage 'images/olive.jpg'
    expect(view.model.attributes.dish_id).toEqual 1

  it 'should reset with a review with new image and dish', ->
    review = new Ti.Model.Review
      picture_binary: (Ti.Filesystem.getFile 'images/sashimi.jpg').read()
      dish_id: 2
    view.reset review
    expect(view.image.image).toEqual Ti.ImageProcess.cropImage 'images/sashimi.jpg' 
    expect(view.model.attributes.dish_id).toEqual 2
