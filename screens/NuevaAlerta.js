import React from 'react';
import {StyleSheet,View,TextInput,ScrollView,Picker,Text} from 'react-native';
import {Button,CheckBox} from 'react-native-elements';
import {addElemento,encontrarCoordenadas,usuarioDatos} from './Controller'

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
       coordenadas:encontrarCoordenadas(),
       usuario:usuarioDatos.email,
       fechaActivacion:new Date().toDateString(),
     }
   }

  guardarAlerta = ()=>{
    addElemento(this.state,'alertas')
    .then(()=>{
      alert('Alerta disparada');
    })
   }

   render(){
     return(
       <ScrollView>
       <View>
       <View style={styles.loginBox}>
         <Text style={styles.text}>GRAVEDAD</Text>
         <Picker
             selectedValue={this.state.tipo}
             style={{height: 50, width: 100}}
             onValueChange={(itemValue, itemIndex) =>
               this.setState({tipo: itemValue})
             }>
             <Picker.Item label="Seleccione" value ="" />
             <Picker.Item label="Alta" value ="alta" />
             <Picker.Item label="Media" value="media" />
             <Picker.Item label="Baja" value="baja" />
           </Picker>
       </View>
       <View style={styles.loginBox}>
         <Text style={styles.text}>PROBLEMA</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="descripcion"

            onChangeText={descripcion => this.setState({ descripcion })}
            value={this.state.descripcion}
          />
       </View>
       <CheckBox
          containerStyle ={{height:10}}
          title='Alerta Publica'
           size={12}
           checked={this.state.publica}
           onPress ={() => this.setState({ck1: !this.state.publica})}
         />
         <CheckBox
            containerStyle ={{height:10}}
            title='Avisar Contacto'
             size={12}
             checked={this.state.mandarMje}
          //   onPress ={() => this.setState({mandarMje: !this.state.mandarMje})}
           />
           <View style={styles.loginBox}>
             <Text style={styles.text}>CONTACTO</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="contacto"
                onChangeText={contacto => this.setState({ contacto })}
                value={this.state.contacto}

              />
           </View>
       </View>
       <View style={styles.button}>
         <Button
          color="#841584"
           onPress={this.guardarAlerta}
           title="Disparar alerta"
         />
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
