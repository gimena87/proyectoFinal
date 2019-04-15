import React from 'react';
import {View,Text,Image,ActivityIndicator} from 'react-native'
import {Avatar,ButtonGroup } from 'react-native-elements';
import FormInfoPerfil from "./componentes/FormInfoPerfil"
import Estadisticas from "./componentes/Estadisticas"
 import PhotoUpload from 'react-native-photo-upload'
import {usuarioDatos,obtenerDatosUser} from "./Controller";


export default class Perfil extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedIndex: 0,
      edicion:false,
      datos:[],
      photo:"",
      isLoading:false,
    }
    this.updateIndex = this.updateIndex.bind(this);
      this.cargaPantalla=this.cargaPantalla.bind(this);
  }

  componentDidMount(){
    if(this.props.navigation.state.params.datos){
      obtenerDatosUser(this.props.navigation.state.params.datos.email).then(datos=>{
        console.log(datos.data());
        this.setState({datos:datos.data()});
      })
      .catch(err => {
          console.log('Error getting document componnet did moun usuariosONline', err);
        });
    }else{
      obtenerDatosUser(usuarioDatos.email).then(datos=>{
        console.log(datos.data());
        this.setState({datos:datos.data()});
      })
      .catch(err => {
          console.log('Error getting document componnet did moun usuariosONline', err);
        });
    }


  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex:selectedIndex});
    //this.props.seleccion(selectedIndex);
  }
   cargaPantalla(opcion){
   switch (opcion) {
     case 0:
          return (<View><FormInfoPerfil amigos={this.props.navigation.state.params.amigos} datos={this.state.datos} esAmigo={this.props.navigation.state.params.esAmigo}/></View>);
       break;
       case 1:
         return (<View><Estadisticas datos={this.state.datos} /></View>);
       break;
       case 2:
          if(this.props.navigation.state.params.amigos){
             return (<View><Text>case 2 </Text></View>);
          }else{
             return (<View><Text>case 2 </Text></View>);
          }

       break;
     default:
      return (<View><FormInfoPerfil amigos={this.props.navigation.state.params.amigos} datos={this.state.datos} esAmigo={this.props.navigation.state.params.esAmigo}/></View>);
   }
 }
  render (){

    const buttons = (this.props.navigation.state.params.amigos)?['Info', 'Proximas salidas', 'Estadisticas']:['Info','Estadisticas','Recorridos'];
    const { selectedIndex } = this.state;
    cargaPantalla = this.cargaPantalla(this.state.selectedIndex);
    return(
      <View>
      {(!this.state.edicion)?<View>
            <Avatar
              xlarge
              rounded
               icon={{name: 'user', type: 'font-awesome'}}
               activeOpacity={0.7}
               containerStyle={{ marginLeft:80}}
               showEditButton= {this.state.edicion}
            /></View>
            :<View>
            <PhotoUpload
            onPhotoSelect={photo => {
                  this.setState({ photo: photo });
              }}
              onStart={()=>console.log('start')}
              onRender={()=>console.log('render')}
           ><Avatar
               xlarge
               rounded
                icon={{name: 'user', type: 'font-awesome'}}
                activeOpacity={0.7}
                containerStyle={{ marginLeft:80}}
                showEditButton= {this.state.edicion}
                />
          </PhotoUpload>
        </View>}
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          backgroundColor='#841584'
          containerStyle={{height: 30}}
        />
           <View>{cargaPantalla}</View>
        </View>

    );

  }
}
