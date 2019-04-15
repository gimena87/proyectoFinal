import React from 'react'
import {View,ScrollView,Text} from 'react-native'
import {Button,CheckBox} from 'react-native-elements';
import FloatLabelTextInput from 'react-native-floating-label-text-input';

export default class FormInfoPerfil extends React.Component{
  constructor(props){
    super(props);
    this.state = {
                nombre:"",
                apellido:"",
                email:"",
                contacto:"",
                visible:false,
                edicion:false,
    }
  }
componentDidMount(){
  datosPerfil = this.props.datos;
  this.setState({
              nombre:datosPerfil.nombre,
              apellido:datosPerfil.apellido,
              email:datosPerfil.email,
              contacto:datosPerfil.contacto,
              visible:datosPerfil.visible,
  });
}
  render (){
    datosPerfil = this.props.datos;
    return(
      <View>
      <ScrollView>
      <View style={{justifyContent: "flex-end"}}>
      {(!this.amigos || !this.state.edicion)?<View>
        <Text>Nombre: {datosPerfil.nombre}</Text>
        <Text>Apellido: {datosPerfil.apellido}</Text>
        <Text>Email: {datosPerfil.email}</Text>
        </View>
        :<View>
      <FloatLabelTextInput
          placeholder={"NOMBRE"}
          value={this.state.nombre}
          onChangeTextValue={nombre => this.setState({ nombre:nombre })}
      />
      <FloatLabelTextInput
          placeholder={"APELLIDO"}
          value={this.state.apellido}
          onChangeTextValue={apellido => this.setState({ apellido:apellido })}
      />
      <FloatLabelTextInput
          placeholder={"EMAIL"}
          value={this.state.email}
          onChangeTextValue={email => this.setState({ email:email})}
      />
      </View>}
      </View>
      {(!this.props.amigos)?<View>
        {(this.props.edicion)?<View><FloatLabelTextInput
          placeholder={"CONTACTO"}
          value={this.state.contacto}
          onChangeTextValue={contacto => this.setState({ contacto:contacto})}
      />
      <CheckBox
         containerStyle ={{height:10,marginTop:20}}
         title='Visible'
          size={12}
          checked={this.state.visible}
          onPress ={() => this.setState({visible: !this.state.visible})}
        /></View>:<View>
        <Text>Contacto: {datosPerfil.contacto}</Text>
        <CheckBox
           containerStyle ={{height:10,marginTop:20}}
           title='Visible'
            size={12}
            checked={this.state.visible}
          />
        <Button
         buttonStyle={{ height: 30, backgroundColor: "#a7cb68", marginTop:10}}
         onPress={()=>this.setState({edicion:true})}
         title="Editar"
       /></View>}</View>:(!this.props.esAmigo)?<View><Button
        buttonStyle={{ height: 30, backgroundColor: "#a7cb68", marginTop:10}}
     //   onPress={()=>this.props.navigation.push('Perfil')}
        title="Agregar a mis Amigos"
      /></View>:null}
      </ScrollView>
      </View>
    );
  }
}
