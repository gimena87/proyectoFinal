import React, { Component } from "react";
import {Button, StyleSheet, Platform, Image, Text, View} from 'react-native'
import FontAwesome, { Icons,IconTypes} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapaOnLine from './componentes/MapaOnLine';
import FormGralRecorrido from './componentes/FormGralRecorrido';
import Search from './componentes/Search';
import Info from './componentes/Info';
import ListaDatos from './componentes/ListaDatos';
import {usuarioDatos,fechaActual} from './Controller'
import {db} from './Firebase';

export default class Salidas extends React.Component{

  constructor(props){
      super(props);
      this.state = {
        datosSalida: [],
        search:'',
        lista:[],
        listaFiltro:[],
     }

  }

 componentDidMount() {
   var wholeData = [];
   console.log('usuarioDatos',usuarioDatos);
       db.collection('usuarios').doc(usuarioDatos.email).collection('salidas').onSnapshot(snapshot => {
         if(snapshot.exist){
           snapshot.forEach(doc => {
             if (doc.data().fecha<fechaActual){
                 wholeData.push(doc.data());
             }
          });
         }
       this.setState({lista:wholeData,listaFiltro:wholeData});
       }, err => {
         console.log(`Encountered error: ${err}`);
       });
 }


  getResponse(datosSalida){
       this.setState({datosSalida:datosSalida});
   }


  getSearch(search){
     const list = this.state.lista;
     const newData = list.filter(item => {
     const itemData = `${item.nombre.toUpperCase()} ${item.descripcion.toUpperCase()}`;
     const textData = search.toUpperCase();
     return itemData.indexOf(textData) > -1;
   });
   this.setState({
     listaFiltro: newData,
   });
}
  render(){

  return(

      <View>
       <Search placeholder="Salidas..." search = {this.getSearch.bind(this)}/>
       <ListaDatos tipo="salidas" data={this.state.listaFiltro} seleccion={this.getResponse.bind(this)}/>
       </View>

    )
 }
}
/*
export default class Salidas extends React.Component {
   constructor(props){
     super(props);
     this.state = {
           salidas: [],
           lista:[],
           listaFiltro:[],
         };
   }
   componentDidMount(){
       //this.listenForItems(this.itemsRef);
       this.getSalidasActivas();
   }
   getSalidasActivas(){
     var fecha = new Date();
     fechaSalida = fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear();
     firebase.database().ref('salidas/').once('value').then(snap =>{
     salidas = Object.entries(snap.val()).map(item => ({...item[1], key: item[0]}));
     salidasActivas = [];
     salidas.map((userData) => {
       if (userData.key!=0){
         salidaFecha =new Date((userData.fecha).split("/").reverse().join("-"));
         if((salidaFecha.getTime()>=fecha.getTime()) && userData.esVisible==true){
           salidasActivas.push(userData);
         }
       }
      });
    //  this.setState({salidas:salidasActivas});
   });

 }

 getSearch(search){
    const list = this.state.lista;
    const newData = list.filter(item => {
    const itemData = `${item.nombre.toUpperCase()} ${item.descripcion.toUpperCase()}`;
    const textData = search.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });
  this.setState({
    listaFiltro: newData,
  });
 }
 FloatingButtonEvent=()=>{
      this.props.navigation.navigate('NuevaSalida');
  }
 renderRow ({item}) {
     return (<ListItem
                id = {item.key}
                title={item.fecha+'-'+item.horario}
                onPress ={this.}
                />) }
   render() {

       return (
       <View style={{justifyContent: 'space-around', justifyContent: 'center'}} >
       <Search placeholder='Novedades Amigos...'  search = {this.getSearch.bind(this)}/>
         <View>
         <List>
           <FlatList
             data={this.state.salidas}
               renderItem={this.renderRow}
             keyExtractor={item => item.key}
           />
         </List>

       </View>
       </View>);
     }
   _renderItem(item) {
 return (
      <ListItem item={item} onPress={onPress} />
    );
  }

 }
*/
