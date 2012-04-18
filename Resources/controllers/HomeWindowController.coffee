Barcode = require('ti.barcode')
Barcode.allowRotation = true
Barcode.displayedMessage = 'Scan the Social Menu QR code'
Barcode.useLED = false
Barcode.useFrontCamera = false

class HomeWindowController
  constructor: (menu)->
    @menu = menu
    @window = Ti.UI.createWindow({
      title: 'SocialMenu homepage',
      backgroundColor: 'red'
    })
    
    topView = Ti.UI.createView {
      backgroundColor: 'white',
      width: '100%',
      height: 50,
      top: 2
    }
    title = Ti.UI.createLabel {
      text: "SocialMenu",
      height: 'auto',
      width: 'auto',
      shadowColor: '#aaa',
      color: '#900',
      font:{fontSize: 48},
      textAlign: 'center'
    }
    topView.add title
    @window.add topView
    
    logoView = Ti.UI.createView {
      backgroundImage: "images/olive.jpg",
      backgroundRepeat: false,
      width: 250,
      height: 188,
      top: 100
    }
    @window.add logoView
    
    # scrollView = Ti.UI.createScrollView({
        # contentWidth: 'auto',
        # contentHeight: 'auto',
        # top: 0,
        # showVerticalScrollIndicator: true,
        # layout: 'vertical'
    # })
    
    # Create a button that will trigger the barcode scanner.
    scanCode = Ti.UI.createButton({
        title: 'Scan Code',
        width: 150,
        height: 60,
        top: 350
    })
    
    overlay = Ti.UI.createView({
      backgroundColor: 'transparent',
      width: 260,
      height: 260,
      top: 100
      left: 30
    })
    
    cancel = Ti.UI.createButton({
      title: 'cancel';
      width: 75,
      height:30,
      top: 350
    })
    cancel.addEventListener 'click', =>
      Barcode.cancel()
      
    overlay.add cancel
    
    scanCode.addEventListener 'click', =>
        # // Note: while the simulator will NOT show a camera stream in the simulator, you may still call "Barcode.capture"
        # // to test your barcode scanning overlay.
        Barcode.capture({
            fullscreen:false,
            animate: true,
            overlay: overlay,
            showCancel: false,
            showRectangle: true,
            keepOpen: true
            # acceptedFormats: [
                # Barcode.FORMAT_QR_CODE
            # ]
        })
        
        
    # scrollView.add scanCode
    @window.add scanCode
    
    Barcode.addEventListener 'error', -> 
      alert 'error on scaning'
      
    Barcode.addEventListener 'success', (e)=>
      @menu.set {'id': e.result}
      Barcode.cancel()
           
  open: ->
    @window.open()
        
module.exports = HomeWindowController
    
