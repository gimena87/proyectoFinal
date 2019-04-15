import React, { Component } from "react";
import {Button, StyleSheet, Platform, Image, Text, View} from 'react-native'
import FontAwesome, { Icons,IconTypes} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapaOnLine from './componentes/MapaOnLine';
import FormGralRecorrido from './componentes/FormGralRecorrido';
import Search from './componentes/Search';
import FiltroSalidas from './componentes/FiltroSalidas';
import Info from './componentes/Info';
import ListaDatos from './componentes/ListaDatos';
import {usuarioDatos,fechaActual} from './Controller'
import {db} from './Firebase';

export default class  BuscarSalidas extends React.Component{

  constructor(props){
      super(props);
      this.state = {
        datosSalida: [],
        search:'',
        lista:[],
        listaFiltro:[],
        filtroHabilitado:false,
     }

  }

 componentDidMount() {
   var wholeData = [];
   var emailUser = usuarioDatos.email;
       db.collection('salidas').onSnapshot(snapshot => {
         if(snapshot.exist){
           snapshot.forEach(doc => {
             if (doc.data().fecha>fechaActual && doc.id!=emailUser){
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

getChecks = ()=>{

}

cancelar = ()=>{

}
  render(){

  return(
    <View><Search placeholder="Buscar Salidas..." search = {this.getSearch.bind(this)} />
    {this.state.filtroHabilitado ?<View><FiltroSalidas filtros={this.getChecks.bind(this)} cancelar={this.cancelar.bind(this)}/></View>:<View><Button
       buttonStyle={{ height: 30, backgroundColor: "#a7cb68"}}
      onPress={()=>this.setState({filtroHabilitado:!this.state.filtroHabilitado})}
      title="Filtrar"
    /></View>}
      <ListaDatos data={this.state.listaFiltro} seleccion={this.getResponse.bind(this)}/>
    </View>

    )
 }
}
