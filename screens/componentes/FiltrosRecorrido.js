import React from 'react'
import {View, Button,Text,TextInput} from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CheckBox } from 'react-native-elements'

export default class FiltrosRecorrido extends React.Component{
  render(){
    return(
      <View>
      <GooglePlacesAutocomplete
          placeholder='Localidad'
          minLength={4} // minimum length of text to search
           returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
           listViewDisplayed='false'    // true/false/undefined
           fetchDetails={true}
           renderDescription={row => row.description} // custom description render
           onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
             console.log('details.geometry.location',details.geometry.location);
             this.setState({origen:details.geometry.location});
           }}
           query={{
             // available options: https://developers.google.com/places/web-service/autocomplete
             key: 'AIzaSyDN30Cqhe2v7tVYm2f6p2Y5ClsFhnosYhA',
             language: 'es', // language of the results
             type:'cities'
                 }}
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            filterReverseGeocodingByTypes={['address', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
      </View>

    )
  }
}
