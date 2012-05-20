(function() {

  exports.cropImage = function(url) {
    var baseImage, cropView, croppedImage;
    baseImage = Ti.UI.createImageView({
      image: url,
      width: 320,
      height: 'auto'
    });
    cropView = Ti.UI.createView({
      width: 320,
      height: 140
    });
    cropView.add(baseImage);
    croppedImage = cropView.toImage();
    return croppedImage;
  };

}).call(this);
