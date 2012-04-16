class MenuData
  constructor: (uuid)->
    
    # menu_data = {"table_number":11,"restaurant":{"name":"soho Den Haag","latitude":"52.062623","longitude":"4.312134","address_line_1":"Foodiesstraat 1","address_line_2":"1234 AA","city":{"name":"Den Haag"},"":[],"takeawaydishes":[{"name":"Banh Mi","description":"Vietnamese baguette filled with meat and soy","price":5.5,"dish_pictures":[{"url":"/system/dish_pictures/photos/000/000/029/original/banhmi.jpg?1334323279"}]},{"name":"Saliva Chicken","description":"Sliced chicken topped with garlic and spicy sauce","price":5.5,"dish_pictures":[{"url":"/system/dish_pictures/photos/000/000/030/original/saliva_chicken.jpg?1334323283"}]},{"name":"Steamed Dumpling","description":"Kipfilet in een zoetzure saus met ananas","price":5.5,"dish_pictures":[{"url":"/system/dish_pictures/photos/000/000/031/original/steamed_dumpling.jpg?1334323286"}]},{"name":"Sliced Beef Omasum","description":"Sliced beef omasum","price":6.5,"dish_pictures":[{"url":"/system/dish_pictures/photos/000/000/032/original/sliced_beef_omasum.jpg?1334323288"}]},{"name":"Sashimi","description":"Raw salmon wrap served with wasabi","price":6.5,"dish_pictures":[{"url":"/system/dish_pictures/photos/000/000/033/original/sashimi.jpg?1334323290"}]},{"name":"Tum Yum Soup","description":"Spicy Thai soup with muschroom, shrimp and various vegetables","price":6.0,"dish_pictures":[{"url":"/system/dish_pictures/photos/000/000/034/original/tumyum_soup.jpg?1334323293"}]},{"name":"Tapas","description":"Spanish seafood tapas","price":6.5,"dish_pictures":[{"url":"/system/dish_pictures/photos/000/000/035/original/tapas.jpg?1334323295"}]}]}}
    @getJSON(uuid)
    alert "get json: " + @jsonObject
    return @jsonObject
    
  getJSON: (uuid)->
    url = "http://localhost:8000/menus/" + uuid + ".json"
    client = Ti.Network.createHTTPClient({
      onload: ->
        Ti.API.info("Received text: " + @responseText)
        @jsonObject = JSON.parse(@responseText)
      onerror: ->
        Ti.API.debug(e.error)
        alert "error" 
      timeout: 5000
    })
    client.open "GET", url, false #asynchronous is false
    client.send() 

module.exports = MenuData
