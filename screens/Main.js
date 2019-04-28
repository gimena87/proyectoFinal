import React from 'react'
import {View} from 'react-native'
import FontAwesome, { Icons,IconTypes} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import BotonesMenu from './componentes/BotonesMenu';
import {db} from './Firebase';
import MapaOnLine from './componentes/MapaOnLine'

export default class Main extends React.Component {
constructor(props){
  super(props);
  this.state = {markers:[],markersA:[]};
}
componentDidMount() {
  var wholeData = [];
  var wholeDataA = [];
  db.collection('usuariosOnline').get()
       .then(snapshot => {
        snapshot.forEach(doc => {
            datos=[];
            datos.nombre=doc.id;
            datos.latlng = {latitude:doc.data().posicionActual[0],longitude:doc.data().posicionActual[1]};
            datos.email = doc.id;
            wholeData.push(datos);
        });

        db.collection('alertas').onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            datos= doc.data();
                datos.title=doc.id;
                datos.email=doc.id;
                datos.latlng = {latitude:doc.data().posicion[0],longitude:doc.data().posicion[1]};
                datos.descripcion = doc.descripcion;
               wholeDataA.push(datos);
          });
          this.setState({markers:wholeData,markersA:wholeDataA});
      })
    })
      .catch(error => {
        console.log('Error!', error);
      })

}
render() {
  console.log('this.state.markers',this.state.markers);
   return (
     <View style={{flex: 1, flexDirection: 'column'}}>
     <MapaOnLine amigos ={this.state.markers} alertas = {this.state.markersA} />
           <View style={{flexDirection: 'column',margin: 5, alignItems: 'center'}}>
              <BotonesMenu name="map-signs"  screen="Recorridos" onPress={()=>this.props.navigation.push('Recorridos')} />
              <BotonesMenu name="users"  screen="Amigos"  navigation={this.props.navigation} onPress={()=>this.props.navigation.push('Amigos')} />
              <BotonesMenu name="bicycle"  screen="Salidas"   onPress={()=>this.props.navigation.push('Salidas')} />
              <BotonesMenu name="bell"  screen="Alertas" onPress={()=>this.props.navigation.push('Alertas')} />
              <BotonesMenu name="user"  screen="Mi perfil" onPress={()=>this.props.navigation.navigate('Perfil',{esAmigo:false,amigos:false})} />
          </View>
      </View>

    )

  }

}
