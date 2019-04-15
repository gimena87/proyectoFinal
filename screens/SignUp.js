import React from 'react'
import { ScrollView,StyleSheet, Text, TextInput, View, Button, Image,TouchableOpacity } from 'react-native';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import {agregarUsuario,encontrarCoordenadas} from './Controller';
import firebase from './Firebase';

export default class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: '', nombre: '', apellido:'',posicion:[],visible:true, errorMessage: null }
  }
  
handleSignUp = () => {
firebase
     .auth()
     .createUserWithEmailAndPassword(this.state.email, this.state.password)
     .then(() => {
        item =this.state;
        console.log('item',item);
        agregarUsuario(item);
         this.props.navigation.navigate('Main');
       })
     .catch(error => this.setState({ errorMessage: error.message }))

}

render() {
    return (
      <ScrollView>

          <View style={styles.container}>
              <Image
               style={{width: 320, height: 250}}
               source={require('D:\\Proyecto Final\\proyectoFinal\\img\\logo3.png')}/>
               <View style={styles.topView}>
                    {this.state.errorMessage &&  <Text style={{ color: 'red' }}>
                                                      {this.state.errorMessage} </Text>}
              <FloatLabelTextInput
                  placeholder={"EMAIL"}
                  value={this.state.email}
                  onChangeTextValue={email => this.setState({email})}
                 />
              <FloatLabelTextInput
                  placeholder={"NOMBRE"}
                  value={this.state.nombre}
                  onChangeTextValue={nombre => this.setState({nombre})}
              />
              <FloatLabelTextInput
                  placeholder={"APELLIDO"}
                  value={this.state.apellido}
                  onChangeTextValue={apellido => this.setState({apellido})}
              />
              <FloatLabelTextInput
                  placeholder={"CONTRASEÑA"}
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeTextValue={password => this.setState({password})}
              />

               <TouchableOpacity style={styles.button}><Text style={styles.btnText} onPress={this.handleSignUp}>Registrarse</Text></TouchableOpacity>
             </View>
             <View style={{flex:2, flexDirection: 'row', justifyContent: "center"}}>
              <Text>Ya tenes cuenta?</Text><Text style={styles.linkStyle} onPress={() => this.props.navigation.navigate('Login')}>Iniciar Sesión</Text>
              </View>
           </View>
           </ScrollView>
            )
          }
        }
          const styles = StyleSheet.create({
           container: {
             flex: 1,
             flexDirection: 'column',
           },
           topView: {
             //backgroundColor: "#80a0ed",
             justifyContent: "flex-end"
           },
           bottomView: {
            // backgroundColor: "#d1deff"
           },
           button: {
             alignItems: "center",
             backgroundColor: "#ef7f3f",
             padding: 10,
             marginTop: 5,
             marginLeft: 40,
             marginRight: 40,
             borderRadius: 5
           },
           linkStyle:{
             color: '#a7cb68',
          fontWeight: 'bold'
           },
           btnText: {
             color: "white",
             fontWeight: "bold",
             fontSize: 14
           },
           textInput: {
             marginTop: 5,
             backgroundColor: "#c2c6d1",
             padding: 10
           },
           loginBox: {
             backgroundColor: "#ffffff",
             flexDirection: "column",
             paddingTop: 10,
             paddingBottom: 10,
             paddingLeft: 20,
             paddingRight: 20,
             //marginLeft: 20,
            // marginRight: 20
           },
          imgStyle:{
            flex: 1,
          //  justifyContent: 'center',
            backgroundColor :'#F0F0F0',//'#FCF5EE',//'#E7F0D2',
            alignItems: 'center',
          },
        })
