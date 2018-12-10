

const Markertest = (res, map) => {
    let markers = [];
    //console.log(res.rating);

if(res !== undefined) {
var icon = {
    url: "https://image.flaticon.com/icons/svg/93/93192.svg",
    animation: window.google.maps.Animation.DROP,
    scaledSize: new window.google.maps.Size(50, 50), // scaled size
    origin: new window.google.maps.Point(0,0), // origin
    anchor: new window.google.maps.Point(0, 0), // anchor
    labelOrigin: new window.google.maps.Point(25, -10)
};
    res.map((results) => {
        //console.log(results.restaurant);
        //const rating = Math.round(results.rating);
        //String(rating);
        let marker = new window.google.maps.Marker({
            position: {lat: parseFloat(results.restaurant.location.latitude), lng: parseFloat(results.restaurant.location.longitude)},
            map: map,
            title: results.restaurant.name,
            icon: icon,
            id: results.restaurant.R.res_id,
            label: { color: 'red', fontWeight: 'bold', fontSize: '14px', "text": results.restaurant.user_rating.aggregate_rating + "/5 Rating   " }
          }
          )      
          markers = [...markers, marker];
          marker = [];
          return marker;
    })


      return markers;
    }
}

export default Markertest;