import React from 'react';
import FontAwesome, { Icons,IconTypes} from 'react-native-fontawesome';
import {StyleSheet,Button,TouchableOpacity,Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class BotonesMenu extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(

        <TouchableOpacity onPress={this.props.onPress}  style={styles.button}>
              <Icon style={styles.icono}
                name={this.props.name}
                size={15}
              />
              <Text>  {this.props.screen}</Text>
        </TouchableOpacity>

    );
  }
}
const styles = StyleSheet.create({
  button:{
    flexDirection: 'row',
    margin: 5,
    backgroundColor : '#a7cb68',//'#FF8C94',
    borderRadius:10,
    height:30,
    width: 250,
    alignItems: 'center',

  },
 icono:{
     paddingLeft: 75,
 }
});
