import React from 'react'
import {View,StyleSheet,Text,Image,Button} from 'react-native';
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
          markers: [],
          datosAlerta:[],
          alarmaSeleccionada:false
        };
  }
 componentDidMount() {
   var wholeData = [];
       db.collection('alertas').onSnapshot(snapshot => {
         snapshot.forEach(doc => {
           datos= doc.data();
              wholeData.push({usuario:datos.usuario,tipo:datos.tipo,descripcion:datos.descripcion, posicion:{ latitude:datos.posicion[0], longitude:datos.posicion[1]}});
         });
        this.setState({markers:wholeData});
      });
 }

getDatosAlerta = alerta=>{
  this.setState({datosAlerta:alerta,alarmaSeleccionada:true});
};
  getResponse(datosAlerta){
       this.setState({datosAlerta:datosAlerta,alarmaSeleccionada:true});
   }

  getTipoAlerta = (nro) =>{
  switch (nro) {
    case '1':
      return "Rotura bici";
    break;
    case '2':
        return "Problema fisico";
    break;
    case '3':
        return "Accidente";
    break;
    case '4':
        return "Otros";
    break;
    default:

  }
}
  render(){
    console.log('this.setState',this.setState);
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
               title={this.getTipoAlerta(marker.tipo)}
               description={marker.descripcion}
                onPress={() =>{this.getDatosAlerta(marker)}}
                pinColor={'indigo'}/>

           ))}
     </MapView>
     <View>
       <Text style={{ fontSize: 20,fontWeight: 'bold'}}>Datos del ciclista</Text>
       <Text style ={{fontWeight: 'bold'}}>Nombre:{this.state.datosAlerta.usuario} </Text>
       <Text style ={{fontWeight: 'bold'}}> Tipo alerta:{this.getTipoAlerta(this.state.datosAlerta.tipo)}</Text>
       <Text style ={{fontWeight: 'bold'}}> Descripcion alerta:{this.state.datosAlerta.descripcion}</Text>
      </View>
      {(this.state.alarmaSeleccionada)?<Button
         buttonStyle={{ height: 30, marginTop:15, backgroundColor: "#a7cb68"}}
        // onPress={this.eliminarAlerta}
         title="Auxiliar"
       />:null}
      </View>
    );
  }
}
const styles = StyleSheet.create ({
   map: {
      height: 250,
   }
})
