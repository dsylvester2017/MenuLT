
            
            
var domap = function(){
    
    let map = '<div id="map-canvas" class="container" style = "height:75%;"></div><input id = "mapText" type = "text" style="width:100%" placeholder="Find by Name"><button class = "btn btn-primary" id = "mapButton">Search</button>        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDf9A85A0554Twap4wgo85Fuuxbb9zgUj0"></script>';
    document.getElementById("content").innerHTML = map;
    document.addEventListener("deviceready", onDeviceReady, false);
            function onDeviceReady() {
                console.log("navigator.geolocation works well");
                navigator.geolocation.getCurrentPosition(onSuccess, onError,
                    { enableHighAccuracy: true, timeout: 20000 });
            }
            function onSuccess(position) {
        /*
            alert('Latitude: '          + position.coords.latitude          + '\n'
                  'Longitude: '         + position.coords.longitude         + '\n' +
                  'Altitude: '          + position.coords.altitude          + '\n');
        */ 
                var lat  = position.coords.latitude;
                var lang = position.coords.longitude;
                //Google Maps
                var myLatlng = new google.maps.LatLng(lat, lang);
                var mapOptions = {
                    zoom: 15,
                    center: myLatlng
                }
                var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map
                });
            }
            function onError(error) {
                alert('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
            }
        
    onDeviceReady();
    function initMap(latitude,longitude) {
        var myLatLng = new google.maps.LatLng(latitude, longitude);
        const map = new google.maps.Map(document.getElementById("map-canvas"), {
          zoom: 15,
          center: myLatLng,
        });
        new google.maps.Marker({
          position: myLatLng,
          map,
          title: "Hello World!",
        });
      }
      
    function buildMap(position){

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            let workspace = document.getElementById("content");
            
            if (this.readyState == 4 && this.status == 200) {
                
                let result = JSON.parse(this.responseText);
                initMap(result.businesses[0].coordinates.latitude,result.businesses[0].coordinates.longitude)
            }
        }; 
        let url = "https://api.yelp.com/v3/businesses/search?latitude="+position.coords.latitude+"&longitude="+position.coords.longitude+"&term="+document.getElementById("mapText").value;
        let API_KEY = "6u85EwwJj94SohWzva8zcBmH7wouQziJn7eeZjQgSfBPwBmveI1pN7Op5Z4DnAYXBgCFgSJPhMzE2WPLIGUKoKEpw5lg3F_SHcArrFSlJbYtKYhs9f9zo1KyiVyvX3Yx";
        xmlhttp.open("GET", url, true);
        xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xmlhttp.setRequestHeader('Authorization', 'Bearer '+API_KEY);
       
        xmlhttp.send();

       
       
        }   
    
    var onSearch = function() {
        navigator.geolocation.getCurrentPosition(buildMap, onError,{ enableHighAccuracy: true, timeout: 20000 });
    }
document.getElementById("mapButton").addEventListener("click",onSearch);
}