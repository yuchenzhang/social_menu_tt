class MenuGuideViewController
  constructor: (menu)->
    @view = Ti.UI.createView
      width: 300
      height: 400
      backgroundColor: '#777'
      opacity: 0.8
      top: 5
    
    close_btn = Ti.UI.createButton
      color:"#fff"
      backgroundImage:'images/BUTT_grn_off.png'
      backgroundSelectedImage:'images/BUTT_grn_on.png'
      backgroundDisabledImage: 'images/BUTT_grn_off.png'
      width:50
      height:30
      font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'}
      title:'Apply'
      right: 125
      bottom: 10
    @view.add close_btn  
    close_btn.addEventListener 'click', =>
      @view.hide()
module.exports = MenuGuideViewController
