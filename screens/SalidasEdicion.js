import React from 'react';
import {View} from 'react-native';
import MapaDraw from './componentes/MapaDraw';

export default class SalidasEdicion extends React.Component{
  constructor(props){
    super(props);
  }

   render(){
     return(
       <View>
       <MapaDraw />
       </View>
     )
   }
}
