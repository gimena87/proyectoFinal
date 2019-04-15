import React from 'react'
import {View,Button} from 'react-native'
import {CheckBox} from 'react-native-elements';
export default class FiltroAmigos extends React.Component{
  constructor(props){
    super(props);
    this.state={ck1:false,
                ck2:false,
                ck3:false}
  }

  filtrar =()=>{
    this.props.filtros(this.state);
  }

  render(){
    return(
      <View>
      <CheckBox
         containerStyle ={{height:10}}
         title='Amigos en común'
          size={12}
          checked={this.state.ck1}
          onPress ={() => this.setState({ck1: !this.state.ck1})}
        />
        <CheckBox
          containerStyle ={{height:10}}
           title='Cerca de mi posición'
            size={12}
            checked={this.state.ck2}
            onPress ={() => this.setState({ck2: !this.state.ck2})}
          />
        <CheckBox
         containerStyle ={{height:10}}
            title='Nuevos usuarios'
            size={12}
            checked={this.state.ck3}
            onPress ={() => this.setState({ck3: !this.state.ck3})}
          />
          <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft:10,
                marginRight:10,
           }}>
          <Button
            onPress={this.filtrar}
            title="Aplicar filtro"
            color="#a7cb68"
          />
          <Button
            onPress={()=>this.props.cancelar(true)}
            title="Cancelar"
            color="#a7cb68"
          />
          </View>
      </View>
    );
  }
}
