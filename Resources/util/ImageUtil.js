(function() {

  exports.cropImageForMenuView = function(url) {
    var baseImage, cropView, croppedImage;
    Ti.API.debug(url);
    baseImage = Ti.UI.createImageView({
      image: url,
      width: 320,
      height: 'auto'
    });
    cropView = Ti.UI.createView({
      width: 320,
      height: 100
    });
    cropView.add(baseImage);
    baseImage.top = '-20%';
    croppedImage = cropView.toImage();
    return croppedImage;
  };

}).call(this);
