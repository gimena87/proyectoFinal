import React from 'react'
import {Button,View,StyleSheet} from 'react-native'
import BackgroundTimer from 'react-native-background-timer';
import MapView,{Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import Geolocation from 'react-native-geolocation-service';

export default class ConsolaNuevoRecorrido extends React.Component{
 constructor(props){
   super(props);
   this.state={
     region: {
       latitude: -38.705118,
       longitude: -62.278847,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421,
     }, tiempo:0,
        km:0,
          ruta:[],
          markers:[],
          iniciado:false,

   };
 }
  iniciar = () =>{
    this.setState({iniciado:true});
    intervalId = BackgroundTimer.setInterval(() => {
	// this will be executed every 200 ms
	// even when app is the the background
  var segundos = parseInt(this.state.tiempo) + 10;
//  navigator.geolocation.getCurrentPosition(

Geolocation.getCurrentPosition(
  posicion => {

          coords= {latitude: posicion.coords.latitude,
          longitude: posicion.coords.longitude};
          var ruta= this.state.ruta;
          ptoAnterior = (ruta.length>0)?ruta[ruta.length-1]:[{latitude:0,
          longitude: 0}];
          if(ruta.length>0){
                ptoIni = ptoAnterior;
                ptoFin = coords;
                rad = function(x) {return x*Math.PI/180;}
                var R = 6378.137; //Radio de la tierra en km
                var dLat = rad( ptoFin.latitude - ptoIni.latitude);
                var dLong = rad(ptoFin.longitude - ptoIni.longitude );
                var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(ptoIni.latitude)) * Math.cos(rad(ptoFin.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                var d = R * c;
                var km = parseFloat(this.state.km) + parseFloat(d.toFixed(2));
                if (this.state.ruta.lenght==0){
                          marker = {
                            latlng: {
                              latitude: coords.latitude,
                              longitude: coords.longitude,
                            },
                            title: 'inicio',
                          }
                  this.setState({ruta: [...this.state.ruta,coords],markers:marker,tiempo:segundos,km:km});
                }else{
                  this.setState({ruta: [...this.state.ruta,coords],tiempo:segundos,km:km});
                }
          }else{ // 1er punto
            this.setState({ruta: [...this.state.ruta,coords],tiempo:0,km:0});
          }
    },
    (error) => console.log(error.message),
         { enableHighAccuracy: true, timeout: 15000,maximumAge: 10000 }
  )
}
  , 10000);
}
  pausar = () =>{
    //modificar controles
    this.setState({iniciado:false});
  }
  cancelar = () =>{
    BackgroundTimer.clearInterval(intervalId);
      this.setState({iniciado:false});
  }
  finalizar = () =>{
    BackgroundTimer.clearInterval(intervalId);
    if(this.state.ruta.length>0){
        marker = {
        latlng: {
          latitude:this.state.ruta[this.state.ruta.length-1].latitude,
          longitude:this.state.ruta[this.state.ruta.length-1].longitude,
        },
        title: 'Fin',
      };
      this.setState({markers: [...this.state.markers,marker],iniciado:false});
    }
    this.setState({iniciado:false});
    this.props.ruta(this.state);
  }
  render(){
    const coord =this.state.ruta;
    return(
      <View>
      <View style={styles.view}>
      <Button
        onPress={this.iniciar}
        title="Iniciar"
        color="#ef7f3f"
        disabled={this.state.iniciado}
      />
      <Button
        onPress={this.pausar}
        title="Pausar"
        color="#ef7f3f"
        disabled={!this.state.iniciado}
      />
      <Button
        onPress={this.cancelar}
        title="Cancelar"
        color="#ef7f3f"
        disabled={!this.state.iniciado}
      /><Button
        onPress={this.finalizar}
        title="Finalizar"
        color="#ef7f3f"
        disabled={!this.state.iniciado}
      />
      </View>
      <MapView
          style = {styles.map}
          initialRegion={
          this.state.region
        }
          showsUserLocation = {true}
          followUserLocation = {true}
          zoomEnabled = {true}>
          {this.state.markers && this.state.markers.map(marker => (
             <MapView.Marker
               key = {marker.title}
               coordinate={marker.latlng}
               title={marker.title}
               description={marker.description}
             />
           ))}
          <MapView.Polyline
            coordinates={coord}
            strokeWidth={3}
            strokeColor='#238C23'/>
     </MapView>
  </View>
    );
  }
}

const styles = StyleSheet.create({
view:{
      flexDirection: 'row',
      justifyContent: 'space-between',
 },
 map: {
    height: 200,
 },
});
