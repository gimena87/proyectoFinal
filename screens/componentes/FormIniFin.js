import React from 'react';
import {Button,View,TextInput,Text,StyleSheet, Image} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapaGeneradorCaminos from './MapaGeneradorCaminos';

export default class FormIniFin extends React.Component{
constructor(props){
  super(props);
  this.state={ origen:'',
               destino:'',
               orig:[],
               dest:[]}
  this.pasarDirecciones=this.pasarDirecciones.bind(this);
}
pasarDirecciones(){
  console.log('pasarDirecciones',this.state) ;
  if(this.state.origen.lat && this.state.destino.lat){
    coord =[{origen:{
                  latitude:this.state.origen.lat,
                  longitude:this.state.origen.lng,
                },
              destino:{
                  latitude:this.state.destino.lat,
                  longitude:this.state.destino.lng,
                }}];
    this.setState({orig:{
                      latitude:this.state.origen.lat,
                      longitude:this.state.origen.lng,
                    },
                    dest:{
                        latitude:this.state.destino.lat,
                        longitude:this.state.destino.lng,
                      }})
    console.log('coord :',coord) ;
  //  this.props.coordenadas(coord);
}else{
  alert('Debe ingresar inicio y fin del recorrido');
}
}

datosRecorridoGenerado(datos){
  this.props.coordenadas({datos});
}
  render(){
    return(
    <View>
          <View style = {styles.view}>
          <GooglePlacesAutocomplete
              placeholder='Inicio'
              minLength={4} // minimum length of text to search
               returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
               listViewDisplayed='false'    // true/false/undefined
               fetchDetails={true}
               renderDescription={row => row.description} // custom description render
               onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                 console.log('data sobre texto',data);
                 console.log(details);
                 this.setState({origen:details.geometry.location});
               }}
               query={{
                 // available options: https://developers.google.com/places/web-service/autocomplete
                 key: 'AIzaSyDN30Cqhe2v7tVYm2f6p2Y5ClsFhnosYhA',
                 language: 'en', // language of the results
                     }}
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                filterReverseGeocodingByTypes={['address', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                />
          </View>
          <View style = {styles.view}>
          <GooglePlacesAutocomplete
              placeholder='Destino'
              minLength={4} // minimum length of text to search
               returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
               listViewDisplayed='false'    // true/false/undefined
               fetchDetails={true}
               renderDescription={row => row.description} // custom description render
               onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                 console.log(details.geometry.location);
                 this.setState({destino:details.geometry.location});
               }}
               query={{
                 // available options: https://developers.google.com/places/web-service/autocomplete
                 key: 'AIzaSyDN30Cqhe2v7tVYm2f6p2Y5ClsFhnosYhA',
                 language: 'en', // language of the results
                     }}
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                filterReverseGeocodingByTypes={['address', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                />

          </View>
          <Button
            onPress={this.pasarDirecciones.bind(this)}
            title="Cargar Ruta"
            color="#ef7f3f" 
          />
          <MapaGeneradorCaminos origin={this.state.orig} destination={this.state.dest} datos={this.datosRecorridoGenerado.bind(this)}/>
    </View>);
  }
}
const styles = StyleSheet.create({
label:{
    margin: 1,
    width: 150,
  },
view:{
     flexDirection: 'row',
 },
 textInput: {
   marginTop: 1,
  // backgroundColor: "#c2c6d1",
   height:15,
   padding: 2,
   fontSize: 11
 },
 loginBox: {
   backgroundColor: "#ffffff",
   flexDirection: "column",
   paddingTop: 2,
   paddingBottom: 2,
   paddingLeft: 5,
   paddingRight: 5,
 },
});
