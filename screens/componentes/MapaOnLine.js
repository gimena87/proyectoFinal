import React from 'react';
import { StyleSheet, View} from 'react-native'
import MapView,{Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import {encontrarCoordenadas} from '../Controller';
export default class MapaOnLine extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          region: {
            latitude: -38.705118,
            longitude: -62.278847,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          markers: []
        };
this.getDatosAmigos = this.getDatosAmigos.bind(this);
  }
  componentDidMount(){
  //  encontrarCoordenadas();

    if (this.props.tipo=="dibujarRuta"){
      cod=(this.props.ruta)?this.props.ruta:[];
      if (cod.length>0){
        markersN=[];
        markerIni = {title:"Inicio",description:"Punto inicio del recorrido",latlng:{ latitude:cod[0].latitude, longitude:cod[0].longitude }};
        markerFin =  {title:"Fin",description:"Punto final del recorrido",latlng:{ latitude:cod[cod.length-1].latitude, longitude:cod[cod.length-1].longitude }};
        markersN.push(markerIni);
        markersN.push(markerFin);
        regionCentrada ={ latitude:cod[0].latitude,
                          longitude: cod[0].longitude,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421
                        };
        this.setState({markers:markersN,region:regionCentrada});
      }
    }else{
  //    this.setState({markers:this.props.amigos});
    }

  }

getDatosAmigos(amigo){
  this.props.seleccion(amigo);
}
  render(){

    cord = (this.props.ruta)?this.props.ruta:[];
    cordNew = (this.props.rutaNew)?this.props.rutaNew:[];
    markers = (cord.length==0)?[]:[{title:"Inicio",description:"Punto inicio del recorrido",latlng:{ latitude:cord[0].latitude, longitude:cord[0].longitude }}, markerFin =  {title:"Fin",description:"Punto final del recorrido",latlng:{ latitude:cord[cord.length-1].latitude, longitude:cord[cord.length-1].longitude }}];
    markersN= (this.props.markersN)?this.props.markersN:[];
    amigos = (this.props.amigos)?this.props.amigos:[];
    return(
      <View>
              <MapView
                  style = {styles.map}
                  initialRegion={
                  this.state.region
                }
                  showsUserLocation = {true}
                  followUserLocation = {true}
                  zoomEnabled = {true}>
                  {markers && markers.map(marker => (
                     <MapView.Marker
                       key={marker.title}
                       coordinate={marker.latlng}
                       title={marker.title}
                       description={marker.description}
                     />
                   ))}
                   {markersN && markersN.map(marker => (
                      <MapView.Marker
                        key={marker.title}
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                      />
                    ))}
                    {amigos && amigos.map(marker => (
                       <MapView.Marker
                         key={marker.email}
                         coordinate={marker.latlng}
                         title={marker.nombre}
                         onPress={() =>{this.getDatosAmigos(marker)}}
                       />
                     ))}
                  <MapView.Polyline
                    coordinates={cord}
                    strokeWidth={3}
                    strokeColor='#238C23'/>
                    <MapView.Polyline
                      coordinates={cordNew}
                      strokeWidth={5}
                      strokeColor='#ef7f3f'/>
             </MapView>
          </View>);
        }
}
const styles = StyleSheet.create ({
   map: {
      height: 250,
   }
})
