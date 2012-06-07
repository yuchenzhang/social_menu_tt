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
      height: 180
    });
    cropView.add(baseImage);
    croppedImage = cropView.toImage();
    return croppedImage;
  };

  exports.saveLocal = function(blob) {
    var f;
    f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "camera.jpg");
    f.write(blob);
    return f.nativePath;
  };

  exports.urlComplete = function(url) {
    if (url === null || url.match(/^https?|ftp|file:\/\//)) return url;
    return Ti.App.endpoint + url;
  };

}).call(this);
