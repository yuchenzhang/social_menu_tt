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

exports.saveLocal = (blob)->
    f = Ti.Filesystem.getFile Ti.Filesystem.applicationDataDirectory, "camera.jpg"
    f.write blob
    return f.nativePath
    
exports.urlComplete = (url)->
  return url if url == null or url.match /^https?|ftp|file:\/\//
  return Ti.App.endpoint + url
