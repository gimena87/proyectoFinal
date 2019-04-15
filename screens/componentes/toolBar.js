import React, { Component } from 'react';
import { View, StatusBar ,StyleSheet,ToolbarAndroid } from 'react-native'
import {usuarioDatos} from '../Controller'
 class ToolBar extends React.Component {
  render() {
    return (
<View>
      <StatusBar
        backgroundColor="blue"
        barStyle="light-content"
      />

      <ToolbarAndroid
          style={styles.toolbar}
          title="Bienvenido"
          onActionSelected={this.onActionSelected}
          actions = {[
            {title: "Alertas", show: "never"},
            {title: "Configuración", show: "never"},
            {title: "Cerrar Sesión", show: "never"},
          ]}
          />
    </View>
    );
  }
  onActionSelected(position) {
    this.props.navigation.push('Configuracion');
}

}
const styles = StyleSheet.create({
    toolbar: {
      backgroundColor: '#2196F3',
      height: 56,
      alignSelf: 'stretch',
    },
  });
export default ToolBar
