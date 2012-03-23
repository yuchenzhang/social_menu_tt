class MenuTableView
  constructor: (dishes) ->
    rows = []
    for dish,num in dishes
      dish_row = Ti.UI.createTableViewRow({
        height: 60})
      row_view = Ti.UI.createView({
        width:280,
        height: 60,
        left:0,
        borderColor: 'black'
      })  
      picture =  Titanium.UI.createImageView({
        image:dish.picture,
        width:100,
        height:60,
        left:1
      })
      
      name = Ti.UI.createLabel({
        text: dish.name,
        font:{fontSize:16,fontWeight:'bold'},
        textAlign: 'left',
        width: 120,
        height:20,
        top: 2,
        left: 105
      })
      
      currency =  Titanium.UI.createImageView({
        image:"/images/Titanium_Iconpack_1/light/light_coins.png",
        width:20,
        height:20,
        top: 2,
        right: 40
      })
      
      price = Ti.UI.createLabel({
       text: dish.price,
       font:{fontSize:12,fontWeight:'bold'},
       textAlign: 'right',
       width: 20,
       height:20,
       top: 2,
       right: 18 
      })
         
      row_view.add picture
      row_view.add name
      row_view.add currency
      row_view.add price
      dish_row.add row_view
      rows.push dish_row   
    
    tableview = Titanium.UI.createTableView({
        data:rows
    })
    
    return tableview

module.exports = MenuTableView
    
    # guideline = Titanium.UI.createView({
      # top:0,
      # left:0,
      # backgroundColor:'white',
      # height:90,
      # width: 'auto'
    # })
#     
    # camera = Titanium.UI.createView({
      # top:0,
      # right:0,
      # backgroundColor:'white',
      # height:90,
      # width: 90,
      # borderColor: 'black'
    # })
#     
    # message = Titanium.UI.createLabel({
        # text:'Please scan the table QR code to obtain your table number',
        # font:{fontSize:12,fontWeight:'bold'},
        # width:190,
        # textAlign:'left',
        # top:5
        # right:5
      # })
    # guideline.add message
    # Titanium.UI.currentWindow.add(guideline)
    # Titanium.UI.currentWindow.add(camera)
