class MenuWindowController
  constructor: (menu)->
    @menu = menu
    @window = Ti.UI.createWindow({
      title: 'SocialMenu menupage',
      backgroundColor: 'white'
    })
    @render()
    @menu.bind "data:refetched", =>
      @render()
    
  render: ->  
    return unless @menu.id
    if @name
      @name.setText @menu.restaurant.get 'name'
    else
      @name = Ti.UI.createLabel({
        text: @menu.restaurant.get('name'),
        font:{fontSize:16,fontWeight:'bold'},
        textAlign: 'left',
        width: 120,
        height:20,
        top: 2,
        left: 105
      })
      @window.add @name
    
    unless @closeButton
      @closeButton = Ti.UI.createButton({
          title: 'Close', textAlign: 'center',
          color: '#000', backgroundColor: '#fff', style: 0,
          font: { fontWeight: 'bold', fontSize: 16 },
          borderColor: '#000', borderRadius: 10, borderWidth: 1,
          opacity: 0.5,
          width: 220, height: 30,
          top: 20
      })
      @closeButton.addEventListener 'click', =>
        @window.close()
        
      @window.add @closeButton
    
    @window.open()
    
module.exports = MenuWindowController
