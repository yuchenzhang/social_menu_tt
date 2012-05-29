exports.cropImage = (url)->
    baseImage = Ti.UI.createImageView
      image: url
      width: 320
      height: 'auto'
    cropView = Ti.UI.createView
      width: 320
      height:180 
    cropView.add baseImage
    croppedImage = cropView.toImage()
    return croppedImage