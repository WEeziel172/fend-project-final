import React from 'react'
import Markertest from './marker.js'

const style = {
  height: '100%'
}
const request = {
  query: 'Kebab in pori',
  fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
};
export default class Map extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      map: '',
      res: '',
    }
  }

  componentDidMount() {
    this.renderMap()

  }
renderMap = () => {
  loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCBXapyK98oJ5L-lydOYHhm8ItNOgvLhFI&libraries=places&callback=initMap")
  window.initMap = this.initMap
}
infowWindow = (name, marker) => {
  //console.log(name);
  const contentString = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">'+ [name] + '</h1>'+
  '<div id="bodyContent">'+
  '<img src=>'+
  '</div>'+
  '</div>';

var infowindow = new window.google.maps.InfoWindow({
content: contentString
});
marker.addListener('click', function() {
  infowindow.open(marker.map, marker);
});
  return infowindow;
}

findPlaces = (results, status) => {
  //console.log(status);
  if (status === window.google.maps.places.PlacesServiceStatus.OK) {
    this.setState({
      res: results
    })
    results.map((res) => {
      //console.log(res);

      
      Markertest(res, this.state.map)

      //this.infowWindow(res.name, marker);

    })
  }
}
    
initMap = () => {

  var map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 61.48333, lng: 21.78333},
    zoom: 15
  })
  this.setState({
    map: map,
  })
  const service = new window.google.maps.places.PlacesService(map);
  service.textSearch(request, this.findPlaces)

  const autocomplete = new window.google.maps.places.SearchBox(
    document.getElementById('filter-input'));


}
  render() {
    return (
        <div id="map"></div>

    )
  }
}

function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}