
import React from 'react'
import { ScrollView,View,Text,Button, TextInput, Image, ActivityIndicator, StyleSheet,TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
export default class Login extends React.Component {
state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  render() {
      return (

        <View style={styles.container}>
          <Image
           style={{width: 320, height: 250}}
           source={require('D:\\Proyecto Final\\proyectoFinal\\img\\logo3.png')}/>
           <ScrollView>
          <FloatLabelTextInput
              placeholder={"EMAIL"}
              value={this.state.email}
              onChangeTextValue={email => this.setState({email})}
             />
         <FloatLabelTextInput
             placeholder={"CONTRASEÑA"}
             secureTextEntry={true}
             value={this.state.password}
             onChangeTextValue={password => this.setState({password})}
         />
           <TouchableOpacity style={styles.button}><Text style={styles.btnText} onPress={this.handleLogin}>Iniciar Sesión</Text></TouchableOpacity>

        <View style={{flex:2, flexDirection: 'row', justifyContent: "center"}}>
        <Text>No tenes cuenta?</Text><Text style={styles.linkStyle} onPress={() => this.props.navigation.navigate('SignUp')}> Registrate</Text>
        </View>
        </ScrollView>
     </View>
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
       color: "#a7cb68",
    fontWeight: 'bold'
     },
     btnText: {
       color: "white",
       fontWeight: "bold",
       fontSize: 14
     },
     textInput: {
       marginTop: 5,
       backgroundColor: "#a7cb68",
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
