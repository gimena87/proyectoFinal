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
  this.state = {markers:[]};
}
componentDidMount() {
  var wholeData = [];
  db.collection('usuariosOnline').get()
       .then(snapshot => {
        snapshot.forEach(doc => {
          console.log('usuarioOnline: ',doc.data());
            datos=[];
            datos.title=doc.id;
            datos.latlng = doc.data().ubicacion;
            datos.description = doc.data().email;
            wholeData.push(datos);
        });
      })
      .catch(error => {
        console.log('Error!', error);
      })
      this.setState({markers:wholeData});
}
render() {
   return (
     <View style={{flex: 1, flexDirection: 'column'}}>
     <MapaOnLine />
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
