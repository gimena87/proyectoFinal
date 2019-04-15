import React from 'react';
import {StyleSheet,Text} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import {ButtonGroup } from 'react-native-elements';

export default class TipoRecorrido extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        selectedIndex: 0
      }
      this.updateIndex = this.updateIndex.bind(this)
    }
    updateIndex (selectedIndex) {
      this.setState({selectedIndex:selectedIndex});
      this.props.seleccion(selectedIndex);
    }
    render() {
      const buttons = [ 'Tiempo real', 'Dibujar','Inicio y Fin']
      const { selectedIndex } = this.state

      return (
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          backgroundColor='#841584'
          containerStyle={{height: 30}}
        />
      )
  }
}
