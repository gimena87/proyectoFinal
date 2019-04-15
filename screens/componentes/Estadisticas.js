import React from 'react'
import {View,Text} from 'react-native'
import {db} from '../Firebase';

export default class Estadisticas extends React.Component{
  constructor(props){
    super(props);
    this.state={
      salidas:0,
      recorridos:0,
      tiempoTotal:0,
      kmtotal:0,
    }
  }

  componentDidMount(){
    datos = this.props.datos;
    cantSalidas = 0;
    cantRecorridos = 0;
    cantKm =0;
    cantTiempo =0;
    db.collection('usuarios').doc(datos.email).collection('salidas').get().then(
      salidas=>{
        if(salidas.exists){
            console.log('existe salidas');
          salidas.forEach(doc => {
            console.log('cantSalidas',cantSalidas);
              cantSalidas++;
              //cantKm += doc.data().km;
              //cantTiempo += doc.data().tiempo;
          });

        }
        db.collection('usuarios').doc(datos.email).collection('recorridos').get().then(
          recorridos =>{
            if(recorridos.exists){
                console.log('existe tRecorridos');
              recorridos.forEach(doc => {
                console.log('cantRecorridos',cantRecorridos);
                  cantRecorridos++;
                  //cantKm += doc.data().km;
                  //cantTiempo += doc.data().tiempo;
              });

          }
          this.setState({salidas:cantSalidas,
          recorridos:cantRecorridos,
          tiempoTotal:cantTiempo,
          kmtotal:cantKm});
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });

  }

  render(){
    datos = this.props.datos;
    console.log('dato',this.state);

    return(<View>
      <Text>Cantidad de Salidas realizadas: {this.state.salidas}</Text>
      <Text>Cantidad de Recorridos realizados: {this.state.recorridos}</Text>
      <Text>Tiempo total de pedaleo: {this.state.tiempoTotal}</Text>
      <Text>Kms total de pedaleo: {this.state.kmtotal}</Text>
      </View>);
  }

}
