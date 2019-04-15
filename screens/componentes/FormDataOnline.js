import React from 'react';
import {View,Text} from 'react-native';
import {Button} from 'react-native-elements';
import {encontrarCoordenadas} from '../Controller';

//var distance = require('google-distance-matrix');

export default class FormDataOnline extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      datosCiclista:[],
    }
    this.busquedaPuntoMasCercano=this.busquedaPuntoMasCercano.bind(this);
    this.tiempoProxPunto=this.tiempoProxPunto.bind(this);
  } 


 /*matrixDir = (posActual,recorrido)=>{
   distance.matrix(origins, destinations, function (err, distances) {
    if (!err)
        console.log(distances);
      })
 }
*/
  async busquedaPuntoMasCercano(recorrido){
    punto = [];
    puntoEncuentro = false;
    posActual =(this.state.datosCiclista.posActual)?this.state.datosCiclista.posActual:[];
    valArray = (this.state.datosCiclista.valArray)?this.state.datosCiclista.valArray + 1:0;
    recorrido = (this.state.datosCiclista.recorrido)?this.state.datosCiclista.recorrido:[];
    tiempo = (this.state.datosCiclista.tiempo)?this.state.datosCiclista.tiempo:0;
    try {
      posActualUsr = await encontrarCoordenadas();
    } catch (error) {
       console.log(error);
     }
    recorridoRestante = recorrido.slice(valArray);
    tiempoUsr = 0;//await this.matrixDir(posActualUsr,recorridoRestante);//paso recorrido y obtengo la distancia a cada punto
     var i=0;
     while(recorrido.length>valArray && !puntoEncuentro) {
      tiempoCicl = await this.tiempoProxPunto(posActual,valArray,recorrido,tiempo);
     if(tiempoUsr[i]<tiempoCicl){
       punto = recorrido[valArray];
       puntoEncuentro = true;
     }else{
       valArray++;
       i++;
     }
   }
   return punto;
  }


 async tiempoProxPunto (pos,indice,recorrido,tiempo){
    var vel = await ((this.obtenerKM(recorrido[0],recorrido[indice-1]))/tiempo).toFixed(2);
    var tiempoProx = await ((this.obtenerKM(pos,recorrido[indice]))/vel).toFixed(2);
    return tiempoProx;
  }

  obtenerKM = (pos1,pos2) =>{
    ptoIni = pto1;
    ptoFin = pto2;
    rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad( ptoFin.latitude - ptoIni.latitude);
    var dLong = rad(ptoFin.longitude - ptoIni.longitude );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(ptoIni.latitude)) * Math.cos(rad(ptoFin.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
  return parseFloat(d.toFixed(2));
  }
  render(){
    puntos = (this.props.datos.recorrido!="")?this.busquedaPuntoMasCercano(this.props.datos.recorrido):"No hay recorrido seleciconadp";
    console.log('this.props.datos',this.props.datos);
      console.log('this.props.datos!=[]',this.props.datos!=[]);
    return(
      <View>

      <Text style={{ fontSize: 20,fontWeight: 'bold'}}>Datos del ciclista</Text>
      <Text style ={{fontWeight: 'bold'}}>Nombre:{this.props.datos.nombre} </Text>
      <Text style ={{fontWeight: 'bold'}}> Posibles puntos de encuentro:</Text>{(this.props.datos.recorrido=="")?<Text>No hay recorrido definido</Text>:null}
        {(this.props.datos!=[])?<View><Button
         buttonStyle={{ height: 30, backgroundColor: "#a7cb68", marginTop:10}}
         onPress={()=>this.props.navigation.navigate('Perfil',{datos:this.props.datos,esAmigo:true,amigos:true})}
         title="Ir a Perfil"
       /></View>:null}
      </View>
    );
  }
}
