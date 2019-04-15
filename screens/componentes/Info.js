import React from 'react';
import {Alert,StyleSheet,Text,View} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {addRecorridoExistente,usuarioDatos} from '../Controller';
export default class Info extends React.Component{
  constructor(props){
    super(props);
    this.renderDificultad = this.renderDificultad.bind(this);
  }

  renderDificultad(datos){
    var iconos=[];
    if (datos.dificultad != undefined) {
        for(let i = 0; i < datos.dificultad; i++){
         iconos.push(<Icon key={i} name='plus-square'/> );
        }
        return iconos;
       }
    else return "";
  }

  render(){
    const tipo = this.props.tipo;
    const datos = this.props.datos;
     const dificultad = this.renderDificultad(this.props.datos);
    return (
      <View style = {styles.container}>
            <View style = {styles.view}>
                    <Text style={styles.label}>Nombre: {datos.nombre}</Text>
                    <Text >Fecha: {datos.fecha}</Text>
            </View>
            <View style = {styles.view}>
              <Text style={styles.label}>Kms.: {datos.km}</Text>
              <Text>Tiempo: {datos.tiempo}</Text>
            </View>
            <View style = {styles.view}>
                <Text style={styles.label}>Dificultad: {dificultad}</Text>

            </View>

           </View>
          );
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
 container:{
   backgroundColor:'#e3f6ce',
   marginTop:5,
 },
 boton:{
   height: 12,
   backgroundColor:"#a7cb68",
 }
});
