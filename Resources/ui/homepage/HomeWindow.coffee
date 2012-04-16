Barcode = require('ti.barcode')
Barcode.allowRotation = true
Barcode.displayedMessage = 'Scan the Social Menu QR code'
Barcode.useLED = true
Barcode.useFrontCamera = false

MenuWindow = require "ui/menu/MenuWindow"
class HomeWindow
  constructor: ->
    self = Ti.UI.createWindow({
      title: 'SocialMenu homepage',
      backgroundColor: 'white'
    })
    
    scrollView = Ti.UI.createScrollView({
        contentWidth: 'auto',
        contentHeight: 'auto',
        top: 0,
        showVerticalScrollIndicator: true,
        layout: 'vertical'
    })
    
    # Create a button that will trigger the barcode scanner.
    scanCode = Ti.UI.createButton({
        title: 'Scan Code',
        width: 150,
        height: 60,
        top: 20
    })
    
    overlay = Ti.UI.createView({
      backgroundColor: 'transparent',
      top: 0, right: 0, bottom: 0, left: 0
    })
    scanCode.addEventListener 'click', ->
        # // Note: while the simulator will NOT show a camera stream in the simulator, you may still call "Barcode.capture"
        # // to test your barcode scanning overlay.
        # Barcode.capture({
            # animate: true,
            # overlay: overlay,
            # showCancel: true,
            # showRectangle: true,
            # keepOpen: true
            # # acceptedFormats: [
                # # Barcode.FORMAT_QR_CODE
            # # ]
        # })
        uuid = "7b018260-6799-012f-0040-58b035fd32cb"
        (new MenuWindow(uuid)).open()     
    scrollView.add scanCode
    self.add scrollView
    
    Barcode.addEventListener 'error', -> 
      alert 'error on scaning'
      
    Barcode.addEventListener 'success', (e)->
      Barcode.cancel()
      (new MenuWindow()).open()
           
    return self
        
module.exports = HomeWindow
  