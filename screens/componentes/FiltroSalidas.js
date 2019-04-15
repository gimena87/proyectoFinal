import React from 'react';
import {Button,KeyboardAvoidingView,View,StyleSheet,Text,TextInput,ScrollView} from 'react-native';
import {CheckBox} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import FiltroDescubrimiento from './FiltroDescubrimiento'

export default class FiltroSalidas extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      fechaD:"",
      fechaH:"",
      horaD:"",
      horaH:"",
    };
  }

  render(){
    return(
      <View style={{flexDirection:'column',flex: 1}}>
      <View style={{flexDirection:'row',flex: 1,marginTop:20}}>
      <DatePicker
        style={{width:150, marginTop:10}}
        date={this.state.fechaD}
        mode="date"
        placeholder="Fecha desde"
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
        onDateChange={(fechaD) => {this.setState({fechaD: fechaD})}}
      />
      <DatePicker
        style={{width: 150, marginTop:10}}
        date={this.state.fechaH}
        mode="date"
        placeholder="Fecha hasta"
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
        onDateChange={(fechaH) => {this.setState({fechaH: fechaH})}}
      />
      </View>
      <View style={{ flex: 1,
    flexDirection: 'row',marginTop:50}}>
      <DatePicker
        style={{width: 150, marginTop:10}}
        date={this.state.horaD}
        mode="time"
        placeholder="Hora desde"
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
        onDateChange={(horaD) => {this.setState({horaD: horaD})}}
      />
      <DatePicker
        style={{width: 150, marginTop:10}}
        date={this.state.horaH}
        mode="time"
        placeholder="Hora hasta"
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
        onDateChange={(horaH) => {this.setState({horaH: horaH})}}
      />
      </View>
      <View style={{marginTop:80}}>
      <FiltroDescubrimiento />
      </View>
      </View>
    )
  }
}
