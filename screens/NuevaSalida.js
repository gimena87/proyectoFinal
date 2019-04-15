import React from 'react';
import {View,Text} from 'react-native'
import FormSalida from './componentes/FormSalida'

export default class NuevaSalida extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View>
      <FormSalida navigation={this.props.navigation} />
      </View>
    )
  }
}
