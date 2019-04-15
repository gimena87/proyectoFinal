import React from 'react';
import {Button,KeyboardAvoidingView,View,StyleSheet,Text,TextInput,ScrollView} from 'react-native';
import {CheckBox} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import NumericInput from 'react-native-numeric-input';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import ListaDatos from './ListaDatos'
import MapaDraw from './MapaDraw'

export default class FormSalida extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      nombre:"",
      fecha:"",
      hora:"",
      cupo:0,
      observacion:"",
      invitados:false,
      visible:false,
      modificarR :false,
      mostrarListaAmigos:false,
      listaAmigos:[],
    }
  }
renderDefinirRecorrido(){
  return (
    <MapaDraw />
  )
}
  render(){
    return(
      <View>
      {(this.state.mostrarListaAmigos)?<ListaDatos />
      :<View>
      <ScrollView>
      <KeyboardAvoidingView>
      <View style={styles.topView}>
      <FloatLabelTextInput
          placeholder={"TITULO"}
          value={this.state.nombre}
          onChangeTextValue={nombre => this.setState({ nombre:nombre })}
      />
      <DatePicker
        style={{width: 200, marginTop:10}}
        date={this.state.fecha}
        mode="date"
        placeholder="Seleccione fecha"
        format="DD/MM/YYYY"
        confirmBtnText="Ok"
        cancelBtnText="Cancelar"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(fecha) => {this.setState({fecha: fecha})}}
      />
      <DatePicker
        style={{width: 200, marginTop:10}}
        date={this.state.hora}
        mode="time"
        placeholder="Seleccione horario"
        format="HH:mm"
        confirmBtnText="Ok"
        cancelBtnText="Cancelar"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(hora) => {this.setState({hora: hora})}}
      />
      <View style={styles.loginBox}>
        <Text style={styles.text}>CUPO</Text>
        <NumericInput
          initValue={this.state.cupo}
          value={this.state.cupo}
          onChange={cupo => this.setState({cupo:cupo, fecha:this.state.fecha,hora:this.state.hora,nombre:this.state.nombre})}
          minValue={0}
          maxValue={5}
          totalHeight={20}
        />
      </View>
      <FloatLabelTextInput
          placeholder={"OBSERVACIONES"}
          value={this.state.observacion}
          onChangeTextValue={observacion => this.setState({ observacion:observacion })}
      />
      <CheckBox
         containerStyle ={{height:10}}
         title='Visible'
          size={12}
          checked={this.state.visible}
          onPress ={() => this.setState({visible: !this.state.visible})}
        />
        <CheckBox
           containerStyle ={{height:10}}
           title='Solo invitados'
            size={12}
            checked={this.state.invitados}
            onPress ={() => this.setState({invitados: !this.state.invitados})}
          />
          <CheckBox
             containerStyle ={{height:10}}
             title='Modificar recorrido'
              size={12}
              checked={this.state.modificarR}
              onPress ={() => this.setState({modificarR: !this.state.modificarR})}
            />
      </View>
      {(this.state.invitados)?<View><Button
        buttonStyle={{ height: 30, backgroundColor: "#a7cb68"}}
        onPress={()=>this.props.navigation.push('Amigos')}
        title="Invitar amigos"
      />
      <ListaDatos />
      </View>:null}
      <View style={styles.button}>
        <Button
         color="#a7cb68"
        //  onPress={this.guardarRecorrido}
          title="Guardar salida"
        />
        </View>
      </KeyboardAvoidingView>
      </ScrollView></View>}
      </View>
    )
  }
}
const styles = StyleSheet.create({
     text:{
       fontSize: 12
     },
     topView: {
       //backgroundColor: "#80a0ed",
       justifyContent: "flex-end"
     },
     textInput: {
       marginTop: 1,
      // backgroundColor: "#c2c6d1",
       height:20,
       padding: 2,
       fontSize: 12
     },
     button:{
         paddingTop: 3,
         paddingBottom: 1,
         paddingLeft: 5,
         paddingRight: 5,
     },
     loginBox: {
       backgroundColor: "#ffffff",
       flexDirection: "column",
       paddingTop: 2,
       paddingBottom: 2,
       paddingLeft: 5,
       paddingRight: 5,
     },
  })
