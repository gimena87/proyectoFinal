import React from 'react';
import { Button,Alert,StyleSheet, View} from 'react-native'
import MapView,{Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
export default class MapaDraw extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          region: {
            latitude: -38.705118,
            longitude: -62.278847,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          ruta: [],
          ultimoPunto:[],
          markers:[],
        };
  }

addCoordenadas = (coords) => {
  if(this.state.ruta.length==0){
     marker = {
       latlng: {
         latitude: coords.latitude,
         longitude: coords.longitude,
       },
       title: 'inicio',
     };
  }
  if(coords!=undefined){
    if(marker!=undefined){
      this.setState({ruta: [...this.state.ruta,coords],
        ultimoPunto:coords,markers:[marker]});
    }else{
      this.setState({ruta: [...this.state.ruta,coords],
        ultimoPunto:coords});
    }
  }
}

guardarRecorrido = () => {
  coords=this.state.ruta;
  console.log('coords',coords);
  console.log('coords.length',coords.length);
if(coords!=undefined && coords.length>0){
    marker = {
    latlng: {
      latitude:this.state.ultimoPunto.latitude,
      longitude:this.state.ultimoPunto.longitude,
    },
    title: 'Fin',
  };
    this.setState({markers: [...this.state.markers,marker]})
    this.props.ruta(coords);
}else{
  alert('Debe dibujar el recorrido deseado')
}
}

deshacerRecorrido = () =>{
  ruta = this.state.ruta;
  punto = this.state.ultimoPunto;
  arreglo = ruta.filter((i) => i !== punto);
  ultimoPto = arreglo[arreglo.length-1];
  if (arreglo.lenght==0){
    this.setState({ruta:arreglo,
                   ultimoPunto:ultimoPto,
                 markers:[]});
  }else{
    this.setState({ruta:arreglo,
                   ultimoPunto:ultimoPto});
  }

}


reiniciarRecorrido = () =>{
  this.setState({ruta:[],
                ultimoPunto:[],
                markers:[]});
}

pickLocationHandler = event =>{
  const coords = event.nativeEvent.coordinate;
  this.addCoordenadas(coords);
}

  render(){
    const coord =this.state.ruta;
    return(
      <View>
              <MapView
                  style = {styles.map}
                  initialRegion={
                  this.state.region
                }
                  onPress = {this.pickLocationHandler}
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
             <View style={styles.view}>
               <Button
                 onPress={this.deshacerRecorrido}
                 title="Deshacer"
                 color="#ef7f3f"
               />
               <Button
                 onPress={this.reiniciarRecorrido}
                 title="Reiniciar"
                 color="#ef7f3f"
               />
               <Button
                 onPress={this.guardarRecorrido}
                 title="Confirmar"
                 color="#ef7f3f"
               />
             </View>
          </View>);
      }
}
const styles = StyleSheet.create ({
   map: {
      height: 200,
   },
   view:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin:5
    }
})
