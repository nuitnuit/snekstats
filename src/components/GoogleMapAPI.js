var locationSuccess = false;

function getLocation() {
  if (navigator.geolocation) {
    var position = navigator.geolocation.getCurrentPosition();
    locationSuccess = true;
    return position;
  } else {
    alert("Geolocation is not supported by this browser.");
    return "";
  }
}

var position = getLocation();

var APIKey = "AIzaSyDtua3j1fxnLTqd3xxt4oCZjiqG08hSfMI";

var axios = require('axios');

function getSearch()
{
    switch(selection)
    {
        case 1 :
            {
                search = "Weight%20Management%20Center";
                break;
            }
        case 2:
            {
                search = "Gym";
                break;
            }
        
        case 3:
            {
                search = "Bariatric%20Surgery";
                break;
            }
        
        case 4:
            {
                search = "Endocrinologist";
                break;
            }
        
        default:
            {
                search = "";
            }
    }
}

function myMap(lat,lng) {
    var mapProp= {
      center:new google.maps.LatLng(lat,lng),
      zoom:5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }

if (locationSuccess)
{
    var lat = position.coords.latitude;
    var lng = position.coords.longtitude;

    var config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + search + '&inputtype=textquery&locationbias=circle:10000@' + lat + ',' + lng + '&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=' + APIKey,
        headers: { }
      };
      

    axios(config)
    .then(function (response) {
      var result = response.data;
      myMap(result.candidates[0].geometry.location.lat,result.candidates[0].geometry.location.lng);
    })
    .catch(function (error) {
      console.log(error);
    });
}
