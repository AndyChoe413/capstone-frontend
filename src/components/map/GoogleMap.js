import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
 

// import './googleMap.css'

export class MapContainer extends Component {

    constructor(props) {
    super(props);
      this.state = {
        address: '',
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},

        mapCenter: {
          lat:  40.754932,
          lng: -73.984016,
      }
      }; 
  };

  // const[showingInfoWindow, setShowingInfoWindow] = useState(false)
  // const [activeMarker, setActiveMarker] = useState()
  // const const [selectedPlaces, setSelectedPlaces] = useState({})
 
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,

    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

    handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    console.log(address)

    // geocodeByAddress(address)
    //   .then(results => getLatLng(results[0]))
    //   .then(latLng => {
    //     console.log('Success', latLng)
    //     this.setState({ address })
    //     this.setState({mapCenter: latLng})
    //   })
    //   .catch(error => console.error('Error', error));
    

    geocodeByAddress(address)
      .then(results =>
     
      {
     return  getLatLng(results[0])
     
      }
    ).then(latLng => {
        this.setState({mapCenter: latLng})
      })
      .catch(error => console.error('Error', error));
  };

 

  render() {
    // console.log(process.env.REACT_APP_GOOGLE_MAP_API)
console.log(this.state.mapCenter)
    return (
      <div className="autocomplete">
         <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <input style={{height: 35, width: 300}}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div  className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        </PlacesAutocomplete>
        
      <Map
        style={{ width: '95vw', height: '60vh', margin: 20}}
        className='google-map'
        google={this.props.google}
        onClick={this.onMapClicked}
         initialCenter={{
            lat: 40.754932,
            lng: -73.984016
          }}
          
        center={{
          lat: this.state.mapCenter.lat,
          lng: this.state.mapCenter.lng
        }}
      >
        <Marker
          position={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
        }}
        />
 
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
      </div>

    )
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_MAP_API)
})(MapContainer)

