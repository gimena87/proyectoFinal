import React, { Component } from "react";
import { StyleSheet, Platform, Image, Text,ScrollView,View} from 'react-native'
import {Button} from 'react-native-elements';
import FontAwesome, { Icons,IconTypes} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapaOnLine from './componentes/MapaOnLine';
import FiltroDescubrimiento from './componentes/FiltroDescubrimiento';
import FormGralRecorrido from './componentes/FormGralRecorrido';
import Search from './componentes/Search';
import Info from './componentes/Info';
import ListaDatos from './componentes/ListaDatos';
import {usuarioDatos,addRecorridoExistente} from './Controller'
import {db} from './Firebase';


export default class DescubriendoRecorrido extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        datosRecorrido: [],
        search:'',
        lista:[],
        listaFiltro:[],
        filtroHabilitado:false,
     }
  }

  componentDidMount() {
    var wholeData = [];
        db.collection('recorridos').where("usuario", "<",usuarioDatos.email).onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            datos=doc.data();
            datos.id=doc.id;
            wholeData.push(datos);
          });
          db.collection('recorridos').where("usuario", ">",usuarioDatos.email).onSnapshot(snapshot => {
            snapshot.forEach(doc => {
               datos=doc.data();
               datos.id=doc.id;
               wholeData.push(datos);
            });
              this.setState({lista:wholeData,listaFiltro:wholeData});

         }, err => {
            console.log('Error!', error);
          })

       }, err => {
          console.log('Error!', error);
        })
  }

  getResponse(datosRecorrido){

       this.setState({mostrarDatos:true,datosRecorrido:datosRecorrido});
   }


  getSearch(search){
     const list = this.state.lista;
     const newData = list.filter(item => {
     const itemData = `${item.nombre.toUpperCase()} ${item.descripcion.toUpperCase()}`;
     const textData = search.toUpperCase();
     return itemData.indexOf(textData) > -1;
   });
  console.log('nueva lista filtrada: ',newData);
   this.setState({
     listaFiltro: newData,
   });
  }
getChecks = (check)=>{
 var wholeData = [];
     db.collection('recorridos').where("usuario", "<",usuarioDatos.email).onSnapshot(snapshot => {
       snapshot.forEach(doc => {
         // console.log(doc.data().name + doc.data().age);
         datos=doc.data();
         if(check.ck1 && check.ck2 &&check.ck3){//todos los casos
           //no hago nada
         }else if(check.ck1 && check.ck2 && !check.ck3){// hasta 20km
           if (datos.km<20 ||datos.km==20){
              wholeData.push(doc.data());
           }
         }else if(check.ck1 && !check.ck2 && !check.ck3){//hasta 10km
           if (datos.km<10 ||datos.km==10){
              wholeData.push(doc.data());
           }
         }else if(!check.ck1 && check.ck2 && check.ck3){//mas de 10km
           if (datos.km>10 ||datos.km==10){
              wholeData.push(doc.data());
           }
         }else if(!check.ck1 && !check.ck2 && check.ck3){//mas de 20km
           if (datos.km>20 ||datos.km==20){
              wholeData.push(doc.data());
           }

         }else if(!check.ck1 && check.ck2 && !check.ck3){//entre 10 y 20km
           if ((datos.km>10 ||datos.km==10) && (datos.km<20 ||datos.km==20)){
              wholeData.push(doc.data());
           }
         }
       });
       db.collection('recorridos').where("usuario", ">",usuarioDatos.email).onSnapshot(snapshot => {
         snapshot.forEach(doc => {
           // console.log(doc.data().name + doc.data().age);
           datos=doc.data();
           if(check.ck1 && check.ck2 &&check.ck3){//todos los casos
             //no hago nada
           }else if(check.ck1 && check.ck2 && !check.ck3){// hasta 20km
             if (datos.km<20 ||datos.km==20){
                wholeData.push(doc.data());
             }
           }else if(check.ck1 && !check.ck2 && !check.ck3){//hasta 10km
             if (datos.km<10 ||datos.km==10){
                wholeData.push(doc.data());
             }
           }else if(!check.ck1 && check.ck2 && check.ck3){//mas de 10km
             if (datos.km>10 ||datos.km==10){
                wholeData.push(doc.data());
             }
           }else if(!check.ck1 && !check.ck2 && check.ck3){//mas de 20km
             if (datos.km>20 ||datos.km==20){
                wholeData.push(doc.data());
             }

           }else if(!check.ck1 && check.ck2 && !check.ck3){//entre 10 y 20km
             if ((datos.km>10 ||datos.km==10) && (datos.km<20 ||datos.km==20)){
                wholeData.push(doc.data());
             }
           }
         });
           this.setState({lista:wholeData,listaFiltro:wholeData});

      }, err => {
         console.log('Error!', error);
       })

    }, err => {
       console.log('Error!', error);
     })

}
cancelar = ()=>{
  this.setState({filtroHabilitado:false});
}

agregarRecorrido = ()=>{
 addRecorridoExistente(this.state.datosRecorrido,usuarioDatos.email);
}
render(){
    return (

        <View>
        {!this.state.mostrarDatos?
                                  <View><Search placeholder="Buscar Recorridos..." search = {this.getSearch.bind(this)} />
                                  {this.state.filtroHabilitado ? <FiltroDescubrimiento  filtros={this.getChecks.bind(this)} cancelar={this.cancelar.bind(this)}/>:<Button
                                     buttonStyle={{ height: 30, backgroundColor: "#a7cb68"}}
                                    onPress={()=>this.setState({filtroHabilitado:!this.state.filtroHabilitado})}
                                    title="Filtrar"
                                  />}
                                    <ListaDatos data={this.state.listaFiltro} seleccion={this.getResponse.bind(this)}/>
                                  </View>
                                 :
                                 <View style={{marginTop:20}}>
                                   <View style={{marginBottom:10}}>
                                        <MapaOnLine tipo='dibujarRuta' ruta={this.state.datosRecorrido.ruta}  />
                                        <Info tipo="recorridosAmigos" datos={this.state.datosRecorrido}/>
                                   </View>
                                   <Button
                                     buttonStyle={{ height: 15,
                                      backgroundColor:"#a7cb68",}}
                                     onPress={this.agregarRecorrido}
                                     title="Agregar a mis Recorridos"
                                   />
                                   <Button
                                   buttonStyle={{ height: 15, marginTop:5,
                                    backgroundColor:"#a7cb68",}}
                                   onPress={()=>this.setState({mostrarDatos:false})}
                                   title="Mas recorridos"
                                   />
                                 </View>
                                 }
        </View>
    )

  }
}
