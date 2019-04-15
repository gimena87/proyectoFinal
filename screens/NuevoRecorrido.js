import React from 'react';
import FormGralRecorrido from './componentes/FormGralRecorrido';
import {View,Text} from 'react-native';

export default class NuevoRecorrido extends React.Component{
   constructor(props){
     super(props);
     this.state={seleccion:0,
                origen:[],
                destino:[]
              }
}


   render(){

     return(
       <View>
          <FormGralRecorrido />
        </View>
     );
   }
 }
