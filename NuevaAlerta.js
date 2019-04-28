import React from 'react';
import {StyleSheet,View,TextInput,ScrollView,Picker,Text} from 'react-native';
import {Button,CheckBox} from 'react-native-elements';
import {db} from "./Firebase"
import {addElemento,encontrarCoordenadas,usuarioDatos,deleteElemento,existeRegistro} from './Controller'
import Geocoder from 'react-native-geocoding';
import FloatLabelTextInput from 'react-native-floating-label-text-input';

export default class NuevaAlerta extends React.Component{
   constructor(props){
     super(props);
     this.state ={
       tipo:"",
       descripcion:"",
       publica:false,
       mandarMje:false,
       contacto:"",
       activa:true,
       posicion:[],
       usuario:usuarioDatos.email,
       fechaActivacion:new Date().toDateString(),
       existeAlarma:false
     }

   }

 componentDidMount(){
    email = usuarioDatos.email;
    navigator.geolocation.getCurrentPosition(
      posicion => {
        db.collection('alertas').doc(email).get().then(val =>{
          cood=[posicion.coords.latitude, posicion.coords.longitude ];
          console.log('val,',val.data);
             if (val.exists){
               this.setState({existeAlarma:true,tipo:val.data.tipo,descripcion:val.data.descripcion,
               publica:val.data.publica,mandarMje:val.data.mandarMje,contacto:val.data.contacto,posicion:cood});
             }else{
               this.setState({existeAlarma:false,posicion:cood});
             }
           });
       },
      error => {
     },
    );
  }

enviarMje = (tel,desc,tipo,posicion,user)=>{
  var SendIntentAndroid = require('react-native-send-intent');
  Geocoder.init('AIzaSyDN30Cqhe2v7tVYm2f6p2Y5ClsFhnosYhA');
  Geocoder.from(posicion[0], posicion[1]).then(json => {
          var addressComponent = json.results[0].address_components[0];
          SendIntentAndroid.sendSms('+54'+tel,user+' tuvo el siguiente problema: '+ desc +' en '+addressComponent);
          console.log(addressComponent);
        })
        .catch(error =>{
          console.warn(error);
          SendIntentAndroid.sendSms('+54'+tel,user+' tuvo el siguiente problema: '+ desc +' en '+posicion[0]+","+ posicion[1]);

        }
      );
}
 guardarAlerta = async()=>{
    console.log('datos a guarfdar',this.state);
    if(this.state.mandarMje){
         await this.enviarMje(this.state.contacto,this.state.descripcion,this.state.tipo,this.state.posicion,this.state.usuario)
    }
    addElemento(this.state,'alertas',null,this.state.usuario)
    alert('Alerta disparada');

   }

eliminarAlerta = () =>{
  console.log('this.state.usuario',this.state.usuario);
  deleteElemento('alertas',this.state.usuario)
  alert('Alerta desactivada')
  this.setState({existeAlarma:false,posicion:cood});
}
   render(){
     return(
       <ScrollView>
       <View>
        <View style={styles.loginBox}>
         <Text style={styles.text}>TIPO PROBLEMA</Text>
         <Picker
             selectedValue={this.state.tipo}
             style={{height: 50, width: 200}}
             enabled={!this.state.existeAlarma}
             onValueChange={(itemValue, itemIndex) =>
               this.setState({tipo: itemValue,descripcion:this.state.descripcion})
             }>
             <Picker.Item label="Seleccione" value = '0' />
             <Picker.Item label="Rotura bici" value = '1' />
             <Picker.Item label="Problema fisico" value= '2' />
             <Picker.Item label="Accidente" value= '3' />
             <Picker.Item label="Otros" value='4' />
           </Picker>
        </View>
        <View style={styles.topView}>
         <FloatLabelTextInput
             placeholder={"PROBLEMA"}
             value={this.state.descripcion}
             onChangeTextValue={nombre => this.setState({ descripcion:nombre })}
             enabled={!this.state.existeAlarma}
         />
       </View>
        <CheckBox
          containerStyle ={{height:10}}
          title='Alerta Publica'
           size={12}
           checked={this.state.publica}
           disabled = {this.state.existeAlarma}
           onPress ={() => this.setState({publica: !this.state.publica,descripcion:this.state.descripcion})}
         />
        <CheckBox
            containerStyle ={{height:10}}
            title='Avisar Contacto'
             size={12}
             disabled = {this.state.existeAlarma}
             checked={this.state.mandarMje}
             onPress ={() => this.setState({mandarMje: !this.state.mandarMje,descripcion:this.state.descripcion})}
           />
           {(this.state.mandarMje)?<FloatLabelTextInput
               placeholder={"NRO CONTACTO"}
               keyboardType={"name-phone-pad"}
               onChangeText={contacto => this.setState({ contacto:contacto,publica:this.state.publica,descripcion:this.state.descripcion })}
               value={this.state.contacto}
           />:null}
        {(!this.state.existeAlarma)?<View><Button
          buttonStyle={{ height: 30, marginTop:15, backgroundColor: "#a7cb68"}}
          onPress={this.guardarAlerta}
          title="Disparar alerta"
       /></View>:<View><Button
          buttonStyle={{ height: 30, marginTop:15, backgroundColor: "#a7cb68"}}
          onPress={this.eliminarAlerta}
          title="Finalizar alerta"
        />
        </View>}
        </View>
       </ScrollView>
     )
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
