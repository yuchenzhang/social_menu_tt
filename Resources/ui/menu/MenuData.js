(function() {
  var MenuData;

  MenuData = (function() {

    function MenuData(uuid) {
      this.getJSON(uuid);
      alert("get json: " + this.jsonObject);
      return this.jsonObject;
    }

    MenuData.prototype.getJSON = function(uuid) {
      var client, url;
      url = "http://localhost:8000/menus/" + uuid + ".json";
      client = Ti.Network.createHTTPClient({
        onload: function() {
          Ti.API.info("Received text: " + this.responseText);
          return this.jsonObject = JSON.parse(this.responseText);
        },
        onerror: function() {
          Ti.API.debug(e.error);
          return alert("error");
        },
        timeout: 5000
      });
      client.open("GET", url, false);
      return client.send();
    };

    return MenuData;

  })();

  module.exports = MenuData;

}).call(this);
