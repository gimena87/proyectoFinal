import React from 'react'
import {View,StyleSheet,Text} from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import {db} from './Firebase';

export default class AlertasActivas extends React.Component{
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
  }

 componentDidMount() {
   var wholeData = [];
       db.collection('alertas').where("activa", "==",true).get()
       .then(snapshot => {
         snapshot.forEach(doc => {
           datos= doc.data();
              wholeData.push({usuario:datos.usuario,tipo:datos.tipo,descripcion:datos.descripcion, posicion:{ latitude:datos.posicion[0], longitude:datos.posicion[1]}});
         });
        this.setState({markers:wholeData});
       })
       .catch(error => {
         console.log('Error!', error);
       })
 }


  getResponse(datosAlerta){
       this.setState({datosAlerta:datosAlerta});
   }

  render(){
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
          {this.state.markers && this.state.markers.map(marker => (
             <MapView.Marker
               key={marker.usuario}
               coordinate={marker.posicion}
               title={marker.tipo}
               description={marker.descripcion}
             />
           ))}
     </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create ({
   map: {
      height: 250,
   }
})
