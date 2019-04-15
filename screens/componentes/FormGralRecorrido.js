import React from 'react';
import {Button,KeyboardAvoidingView,View,StyleSheet,Text,TextInput,ScrollView} from 'react-native';
import TipoRecorrido from './TipoRecorrido';
import {CheckBox} from 'react-native-elements';
import MapaOnLine from './MapaOnLine';
import MapaDraw from './MapaDraw';
import MapaGeneradorCaminos from './MapaGeneradorCaminos';
import FormIniFin from './FormIniFin';
import ConsolaNuevoRecorrido from './ConsolaNuevoRecorrido';
import NumericInput from 'react-native-numeric-input';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import {addRecorrido,usuarioDatos} from '../Controller'


export default class FormGralRecorrido extends React.Component{
  constructor(props){
    super(props);
    this.state= {
        usuario:usuarioDatos.email,
        nombre: "",
        descripcion: "",
        dificultad:0,
        visible:false,
        ruta:[],
        km:0,
        tiempo:0,
        seleccion:0,
        fecha:(new Date()).toString(),
      };
      this.getSeleccionRecorrido=this.getSeleccionRecorrido.bind(this);
      this.cargaRecorrido=this.cargaRecorrido.bind(this);
      this.guardarRecorrido=this.guardarRecorrido.bind(this);
      this.getRuta=this.getRuta.bind(this);
      this.obtenerKmTime=this.obtenerKmTime.bind(this);
      this.pad=this.pad.bind(this);

    }
    getSeleccionRecorrido(select){
      this.setState({seleccion:select});
    }

    getCoordenadasRuta(datos){//recorrido creado x google
      this.setState(datos);
      }


   async  getRuta(ruta){//recorrido creado x usuario
      kmhs = await this.obtenerKmTime(ruta);
      this.setState({ruta:ruta,coord:[],km:kmhs.km.toFixed(2),tiempo:kmhs.tiempo});
    }

    async  getRutaTR(datos){//recorrido creado x usuario en TR
      var tiempo = this.obtenerTiempo(0,(datos.tiempo/60));
      var ruta = datos.ruta;
      var km = datos.km
       this.setState({ruta:ruta,coord:[],km:km.toFixed(2),tiempo:tiempo});
     }


async guardarRecorrido(){
      if (this.state.ruta.length==0 && (!this.state.coord || this.state.coord.length==0)){
        alert('Debe crear su recorrido mediante algunas de las opciones.');
      }else{
        if(this.state.nombre=="" || this.state.descripcion=="" || this.state.dificultad==0){

          alert('Hay campos incompletos.');
        }else{
          if (this.state.ruta.length>0){//ruta dibujada o creada en tiempo real
              await addRecorrido(this.state,this.state.usuario);
                alert('recorrido guardado exitosamente');
                vaciarCampos();
          }else{//ruta creada por 2 puntos
              await addRecorrido(this.state,this.state.usuario);
               alert('recorrido guardado exitosamente');
               vaciarCampos();
          }
        }
      }

    }

vaciarCampos = ()=>{
  this.setState({nombre: "",
  descripcion: "",
  dificultad:0,
  visible:false,
  ruta:[],
  km:0,
  tiempo:0,
  seleccion:0});

}
obtenerTiempo = (km,tiempoCalc) => {
  var tiempo = 0;
    if(km!=0){//calculo tiempo
      tiempo =km/20;
    }else if (tiempoCalc!=0) {
      tiempo = tiempoCalc/60; //paso  de minutos a hs
    }
    if (tiempo!=0){
      var ts = tiempo*3600;
      var h = Math.floor(ts/3600);
      var m = Math.floor((ts-(h*3600))/60);
      var s = ts - (h*3600) - (m*60);

       hTexto = "";
      hTexto+=(h > 0)?this.pad(h,2)+":":"00:";
      hTexto+=(m > 0)?this.pad(m,2)+":":"00:";
      hTexto+=(s > 0)?this.pad(Math.trunc(s),2):"00";

      return hTexto;
  }else{
    return "00:00:00";
  }
  }

  pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
 }

  /*obtenerDistancia = (ptoIni,ptoFin) => {
    rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad( ptoFin.latitude - ptoIni.latitude);
    var dLong = rad(ptoFin.longitude - ptoIni.longitude );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(ptoIni.latitude)) * Math.cos(rad(ptoFin.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d.toFixed(2); //Retorna tres decimales
  }*/

  obtenerKmTime(ruta){
    console.log('obtenerKmTime');
   var km = 0;
   ptoAnterior = [];
   if(ruta.length>0){
     ruta.forEach(function(val,indice){
       if(indice!=0){
         ptoIni = ptoAnterior;
         ptoFin=val;
         rad = function(x) {return x*Math.PI/180;}
         var R = 6378.137; //Radio de la tierra en km
         var dLat = rad( ptoFin.latitude - ptoIni.latitude);
         var dLong = rad(ptoFin.longitude - ptoIni.longitude );
         var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(ptoIni.latitude)) * Math.cos(rad(ptoFin.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2);
         var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
         var d = R * c;
           km = parseFloat(km)+ parseFloat(d.toFixed(2));
       }
       ptoAnterior=val;
     });
   }
   tiempo = this.obtenerTiempo(km,0);
   return {km:km,tiempo:tiempo};
 }
    cargaRecorrido(opcion){
      console.log('cargaRecorridor',this.state);
      switch (opcion) {
        case 2:
           return <View><FormIniFin coordenadas={this.getCoordenadasRuta.bind(this)} coordNew={this.state}/></View>;
        break;
        case 1:
         return <MapaDraw ruta= {this.getRuta.bind(this)} />;
        break;
        case 0:
        return <ConsolaNuevoRecorrido ruta={this.getRutaTR.bind(this)}/>;
       break;
        default:
        return <View><FormIniFin coordenadas={this.getCoordenadasRuta.bind(this)}/></View>;
         break;
      }
    }

  render(){
     cargaRecorrido = this.cargaRecorrido(this.state.seleccion);
    return(
      <ScrollView>
      <KeyboardAvoidingView>
      <View style={styles.topView}>
        <FloatLabelTextInput
            placeholder={"NOMBRE"}
            value={this.state.nombre}
            onChangeTextValue={nombre => this.setState({ nombre:nombre })}
        />
        <FloatLabelTextInput
          placeholder={"DESCRIPCIÓN"}
          value={this.state.descripcion}
          onChangeTextValue={descripcion => this.setState({ descripcion:descripcion })}

        />
        <View style={styles.loginBox}>
          <Text style={styles.text}>DIFICULTAD</Text>
          <NumericInput
            initValue={this.state.dificultad}
            value={this.state.dificultad}
            onChange={dificultad => this.setState({dificultad:dificultad, descripcion:this.state.descripcion,nombre:this.state.nombre})}
            minValue={0}
            maxValue={5}
            totalHeight={20}
          />
          <CheckBox
             containerStyle ={{height:10}}
             title='Recorrido publico.'
              size={12}
              checked={this.state.visible}
              onPress ={() => this.setState({visible: !this.state.visible})}
            />
        </View>

      </View>
      <View>
      <TipoRecorrido seleccion={this.getSeleccionRecorrido.bind(this)}/>
        {cargaRecorrido}
      </View>
      <View style={styles.button}>
        <Button
         color="#a7cb68"
          onPress={this.guardarRecorrido}
          title="Guardar Recorrido"
        />
        </View>
      </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
     text:{
       fontSize: 12
     },
     topView: {
       //backgroundColor: "#80a0ed",
       justifyContent: "flex-end"
     },
     textInput: {
       marginTop: 1,
      // backgroundColor: "#c2c6d1",
       height:20,
       padding: 2,
       fontSize: 12
     },
     button:{
         paddingTop: 3,
         paddingBottom: 1,
         paddingLeft: 5,
         paddingRight: 5,
     },
     loginBox: {
       backgroundColor: "#ffffff",
       flexDirection: "column",
       paddingTop: 2,
       paddingBottom: 2,
       paddingLeft: 5,
       paddingRight: 5,
     },
  })
