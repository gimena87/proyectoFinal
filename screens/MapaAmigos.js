import React from 'react';
import {View} from 'react-native';
import MapaOnLine from './componentes/MapaOnLine';
import FormDataOnline from './componentes/FormDataOnline';
import {db} from './Firebase';
import {usuarioDatos,obtenerDatosUser} from './Controller';
export default class MapaAmigos extends React.Component{

constructor(props){
  super(props);
  this.state = {
    amigos:[],
    amigoSeleccionado:[],
    email:usuarioDatos.email,
  }
}

obtenerAmigo(datos){
  this.setState({amigoSeleccionado:datos});
}

componentDidMount(){
  var wholeData = [];
      db.collection('usuariosOnline').onSnapshot(snapshot => {
        snapshot.forEach(doc => {
           var email = doc.id;
           if(email!=this.state.email){
             db.collection('usuarios').doc(this.state.email).collection('amigos').doc(email).get()
             .then( rta =>{
               if (rta.exists){
                datos= doc.data();
                camino = (datos.recorrido)?datos.recorrido:"";
                wholeData.push({email:email,latlng:{ latitude:datos.posicionActual[0], longitude:datos.posicionActual[1]},nombre:email,recorrido:camino})
                this.setState({amigos:wholeData});
             }else{
               console.log("no hay rta");
             }
            })
            .catch(err => {
                console.log('Error getting document componnet did moun usuariosONline', err);
              });
            }
      });
    });

}

  render(){
    console.log("this.props.navigation",this.props.navigation);
    return(<View>
      <MapaOnLine amigos={this.state.amigos} seleccion={this.obtenerAmigo.bind(this)} />
      <FormDataOnline datos={this.state.amigoSeleccionado}   navigation={this.props.navigation}/>
      </View>);
  }
}
