  import React, { Component } from 'react';
  import FilterMap from './filter-map';
  import Markertest from './marker.js';
  import PlacesList from './places-list';

  import './App.css';

  function gm_authFailure() {
    alert("Error loading maps");
  };
  class App extends Component {
    constructor(props) {
      super(props)
      
      this.state = {
        map: '',
        res: [],
        markers: [],
        value: '',
        allLocations: [],
        currentMarker: [],
      }
      this.onClickChange.bind = this.onClickChange.bind(this);
      this.filterPlaces.bind = this.filterPlaces.bind(this);
    }
    

    componentDidMount() {
      this.renderMap()

    }
  renderMap = () => {
  loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCBXapyK98oJ5L-lydOYHhm8ItNOgvLhFI&libraries=places&callback=initMap")
    window.initMap = this.initMap
  }
  infowWindow = (markers) => {
    let contentString;

    if(markers !== undefined) {
    markers.map((marker) => {
      var that = this;
      var request = new Request(`https://developers.zomato.com/api/v2.1/reviews?res_id=${marker.id}`, {
        method: 'GET', 
        mode: 'cors', 
        headers: new Headers({
          "user-key": "336d47190fd59c023b1c8b513de823ac",
        })
      });
    
      fetch(request).then((response) => {
        return response.json();
      })
    
      .then((review) => {
        console.log(review);
        let all;
        contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        `<h1 id="firstHeading" class="firstHeading">${marker.title}</h1>`+
        '<div id="bodyContent">'+
        '<h2>Check what people are saying about us</h2>'+
        `<p>
        ${review.user_reviews['0'].review.review_text}
        </p>`+
        '</div>'+
        '</div>';
      }).then(() => {
        let infowindow = new window.google.maps.InfoWindow({
          content: contentString,
          });
          
          marker.addListener('click', function() {
            if(that.state.currentMarker.length !== 0)
            {
              that.state.currentMarker.close();

            }

            infowindow.open(marker.map, marker);
            that.setState({
              currentMarker: infowindow,
            })
          });   
          return infowindow;     
      })
      .catch((error) => { 
        console.log("This error" + error)
      });
    return null;
    })



  }
  }

  filterPlaces = (event) => {
    console.log(event);

    if(event !== '' && this.state.markers !== undefined) {

  this.state.markers.map((marker) => {
    marker.setMap(null)

  return null;
  });

    this.setState({
      markers: [],
    })
    let allLocations = this.state.allLocations;
    let allMarkers = this.state.markers;
    var request = new Request(`https://developers.zomato.com/api/v2.1/search?lat=51.509865&lon=0.118092&establishment_type=91&q=${event}`, {
      method: 'GET', 
      mode: 'cors', 
      headers: new Headers({
        "user-key": "336d47190fd59c023b1c8b513de823ac",
      })
    });

    fetch(request).then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      allLocations = myJson.restaurants;
      //console.log(allLocations);
    })
    .then(() => {
      this.setState({
        allLocations: allLocations,
      })
      allMarkers = Markertest(allLocations, this.state.map);
    }).then (() => {
      this.setState({
        markers: allMarkers,
      })
      this.infowWindow(this.state.markers);
    });
    return null;
    //const service = new window.google.maps.places.PlacesService(this.state.map);
    //service.textSearch(NewRequest, this.findPlaces)
  }}
  findPlaces = (results, status) => {
    //console.log(status);
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      this.setState({
        res: results
      })
        //console.log(res);


        
        const allMarkers = Markertest(this.state.res,this.state.map);
        console.log(allMarkers);
        this.setState({
          markers: allMarkers})

        //console.log(allMarkers)

        //this.infowWindow(res.name, marker);

    }
  }
      
  onClickChange = (name) => {
    this.state.markers.map((marker) => {
      if(marker.id !== name.restaurant.R.res_id) {
        marker.setMap(null);}
    else if(marker.title === name.restaurant.name) {
      marker.setMap(this.state.map);
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      document.querySelector(`[title="${name.restaurant.name}"]`).click();
    
    }
      
      return null;
    })
  }
  inputReset = () => {
    this.state.markers.map((marker) => {
      console.log(marker);
      marker.setMap(this.state.map);
      marker.setAnimation(null);
    })
  }

  initMap = () => {
    let allLocations = [];
    let allMarkers = [];

    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 51.509865, lng: 0.118092}, 
      zoom: 11
    })
    this.setState({
      map: map,
    })
    if (!window.google.maps) {
      const heading = <h2>Error occured while loading map</h2>;
      document.getElementById('map').appendChild(heading);
    }

    var request = new Request("https://developers.zomato.com/api/v2.1/search?lat=51.509865&lon=0.118092&establishment_type=91", {
      method: 'GET', 
      mode: 'cors', 
      headers: new Headers({
        "user-key": "ce6dd5bfddd45e53cb93fd298f11ebf7",
      })
    });

    fetch(request).then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      allLocations = myJson.restaurants;
      //console.log(allLocations);
    })
    .then(() => {
      this.setState({
        allLocations: allLocations,
      })
      allMarkers = Markertest(allLocations, this.state.map);
    }).then (() => {
      this.setState({
        markers: allMarkers,
      })
      
      this.infowWindow(this.state.markers);
    });


    

    //const service = new window.google.maps.places.PlacesService(map);
    
    //service.textSearch(request, this.findPlaces)

    //const autocomplete = new window.google.maps.places.SearchBox(
    // document.getElementById('filter-input'));


  }
    render() {
      return (
        <div className="App">
        <div className="container">
          <div className="nav">
            <div className="inner-nav">
            <FilterMap filterPlaces={this.filterPlaces} inputReset={this.inputReset} />
              <PlacesList onClickChange={this.onClickChange} res={this.state.allLocations} />

            </div>
            <div aria-label="Map container" id="map">

            </div>
          </div>
          </div>         
          </div>


      );
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
  export default App;
