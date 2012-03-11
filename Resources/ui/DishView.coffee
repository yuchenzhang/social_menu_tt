data = {
  title: "Greek Lamb", 
  pictures:[
    'http://placehold.it/200x120',
    'http://placehold.it/200x120',
    'http://placehold.it/200x120',
    'http://placehold.it/200x120',
    'http://placehold.it/200x120'],
    
}


scrollView = Titanium.UI.createScrollView({
  contentWidth:1000,
  contentHeight:120,
  top:10,
  height:130,
  width:'100%',
  backgroundColor:'A6AAB0'
})

for url, num in data.pictures
  image_view = Titanium.UI.createImageView({
    image:url,
    width:200,
    height:120,
    left: 10 + num * 210,
    top:5
  })
  scrollView.add image_view
  


win = Titanium.UI.currentWindow
win.backgroundColor = 'white'
win.add scrollView