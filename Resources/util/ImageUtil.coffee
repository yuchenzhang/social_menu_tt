exports.cropImageForMenuView = (url)->
    Ti.API.debug url
    baseImage = Ti.UI.createImageView
      image: url
      width: 320
      height: 'auto'
    cropView = Ti.UI.createView
      width: 320
      height: 100
    cropView.add baseImage
    baseImage.top = '-20%'
    croppedImage = cropView.toImage()
    croppedImage
  
