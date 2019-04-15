import React, { Component } from "react";
import {Alert,ScrollView, StyleSheet, Platform, Image, Text, View} from 'react-native'
import {Button} from 'react-native-elements';
import FontAwesome, { Icons,IconTypes} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapaOnLine from './componentes/MapaOnLine';
import Search from './componentes/Search';
import BackgroundTimer from 'react-native-background-timer';
import Info from './componentes/Info';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import ListaDatos from './componentes/ListaDatos';
import {usuarioDatos,guardarEstadistica,activarVisibilidad,posActual} from './Controller'
import {db} from './Firebase';

export default class Recorridos extends React.Component{

  constructor(props){
      super(props);
      this.state = {
        datosRecorrido: [],
        search:'',
        lista:[],
        listaFiltro:[],
        mostrarDatos:false,
        rutaNew:[],
        iniciado:false,
        markersN:[],
        tiempo:0,
        km:0
     }

  }
 componentDidMount() {
   var wholeData = [];
   db.collection('usuarios').doc(usuarioDatos.email).collection('recorridos').get()
  //     db.collection('recorridos').where("usuario", "==",usuarioDatos.email).get()
       .then(snapshot => {
         snapshot.forEach(doc => {
             datos =  doc.data();
             datos.id=doc.id;
             wholeData.push(datos);
         });
        this.setState({lista:wholeData,listaFiltro:wholeData});
       })
       .catch(error => {
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
   this.setState({
     listaFiltro: newData,
   });
}

iniciarRecorridoTR=()=>{
  intervalId = BackgroundTimer.setInterval(() => {
    // this will be executed every 200 ms
  // even when app is the the background
  var segundos = parseInt(this.state.tiempo) + 10;
  navigator.geolocation.getCurrentPosition(
  posicion => {

        coords= {latitude: posicion.coords.latitude,
        longitude: posicion.coords.longitude};
        var rutaNew= this.state.rutaNew;
        ptoAnterior = (rutaNew.length>0)?rutaNew[rutaNew.length-1]:[{latitude:0,
        longitude: 0}];
        if(rutaNew.length>0){
              ptoIni = ptoAnterior;
              ptoFin = coords;
              rad = function(x) {return x*Math.PI/180;}
              var R = 6378.137; //Radio de la tierra en km
              var dLat = rad( ptoFin.latitude - ptoIni.latitude);
              var dLong = rad(ptoFin.longitude - ptoIni.longitude );
              var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(ptoIni.latitude)) * Math.cos(rad(ptoFin.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2);
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
              var d = R * c;
              var km = parseFloat(this.state.km) + parseFloat(d.toFixed(2));
              if (this.state.rutaNew.lenght==0){
                        marker = {
                          latlng: {
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                          },
                          title: 'inicio',
                        }
                this.setState({rutaNew: [...this.state.rutaNew,coords],markersN:marker,tiempo:segundos,km:km,iniciado:true});
              }else{
                this.setState({rutaNew: [...this.state.rutaNew,coords],tiempo:segundos,km:km,iniciado:true});
              }
        }else{ // 1er punto
          this.setState({rutaNew: [...this.state.rutaNew,coords],tiempo:0,km:0,iniciado:true});
        }
  },
  error => {
   console.log('ERROR');
  },
  )
  }
  , 10000);
}

finalizarRecorrido= () =>{
  BackgroundTimer.clearInterval(intervalId);
  if(this.state.rutaNew.length>0){
      marker = {
      latlng: {
        latitude:this.state.rutaNew[this.state.rutaNew.length-1].latitude,
        longitude:this.state.rutaNew[this.state.rutaNew.length-1].longitude,
      },
      title: 'Fin',
    };
    this.setState({markersN: [...this.state.markersN,marker],iniciado:false});
  }else{
      this.setState({iniciado:false});
  }
  Alert.alert(
    'Recorrido finalizado',
    'Desea Guardar sus tiempos?',
    [
      {text: 'Si', onPress: this.guardarEstadistica.bind(this)},
      {text: 'Cancelar', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
}

guardarEstadistica(){

  guardarEstadistica(this.state.datosRecorrido.id,this.state.km,this.state.tiempo,usuarioDatos.email);
}

activarVisib(){

  coords=[];
  navigator.geolocation.getCurrentPosition(
  posicion => {
        coords= {latitude: posicion.coords.latitude,
        longitude: posicion.coords.longitude};
      }).then(()=>{activarVisibilidad(this.state.datosRecorrido.id,usuarioDatos.email,coords)});

  Alert.alert(
    'Iniciar Recorrido',
    'Preparado?',
    [
      {text: 'Iniciar', onPress:this.iniciarRecorridoTR.bind(this)},
      {text: 'Cancelar', onPress: () => console.log('Cancelar')},
    ],
    {cancelable: false},
  );
}

comenzarRecorrido = ()=>{

  Alert.alert(
    'Iniciar Recorrido',
    'Quiere ser visible para sus amigos?',
    [
      {text: 'Si', onPress:this.activarVisib.bind(this)},
      {
        text: 'No',
        onPress: () => {Alert.alert(
                            'Iniciar Recorrido',
                            'Preparado?',
                            [
                              {text: 'Iniciar', onPress:this.iniciarRecorridoTR.bind(this)},
                              {text: 'Cancelar', onPress: () => console.log('Cancelar')},
                            ],
                            {cancelable: false},
                          );
                        },
        style: 'cancel',
      },
      {text: 'Cancelar', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
}



  render(){
console.log("render iniciado: ",this.state.iniciado);
  return(
    <View>
      {!this.state.mostrarDatos?<View>
                                    <Search placeholder="Recorridos..." search = {this.getSearch.bind(this)}/>
                                    <ListaDatos tipo="recorridos" data={this.state.listaFiltro} seleccion={this.getResponse.bind(this)}/>
                                </View>
                                :
                                <View style={{marginTop:10}}>
                                  <View style={{marginBottom:10}}>
                                    <Info tipo="recorridos" datos={this.state.datosRecorrido}/>
                                    <MapaOnLine tipo='dibujarRuta' ruta={this.state.datosRecorrido.ruta} rutaNew={this.state.rutaNew} markersN={this.state.markersN}/>
                                  </View>
                                  <Button
                                    buttonStyle={{ height: 15,
                                     backgroundColor:"#a7cb68",}}
                                    onPress={this.comenzarRecorrido.bind(this)}
                                    title="Comenzar Recorrido"
                                  />
                                  {this.state.iniciado ?<Button
                                    buttonStyle={{ height: 15,
                                     backgroundColor:"#a7cb68",}}
                                    onPress={this.finalizarRecorrido.bind(this)}
                                    title="Finalizar"
                                  />:null}
                                  <Button
                                  buttonStyle={{ height: 15, marginTop:5,
                                   backgroundColor:"#a7cb68",}}
                                  onPress={()=>this.setState({mostrarDatos:false})}
                                  title="Mas recorridos"
                                  />
                                </View>
                        }
                        </View>
        );
 }
}
