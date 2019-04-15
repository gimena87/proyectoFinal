import React from 'react'
import { View, Text, FlatList,StyleSheet, Alert} from 'react-native'
import ToolBar from './componentes/toolBar'
import { List, ListItem } from "react-native-elements";
import firebase from 'react-native-firebase'
import Search from './componentes/Search'
import {usuarioDatos} from './Controller'
import {db} from './Firebase';
const styles = require('./styles.js')

export default class Amigos extends React.Component {
  constructor(props) {
 super(props);
 this.state = {
       lista:[],
       listaFiltro:[],
     };

   }

  getSearch(search){
     const list = this.state.lista;
     const newData = list.filter(item => {
     const itemData = `${item.nombre.toUpperCase()} ${item.descripcion.toUpperCase()}`;
     const textData = search.toUpperCase();
     return itemData.indexOf(textData) > -1;
   });
   this.setState({
     listaFiltro: newData,
   });
  }

   componentDidMount() {
    var  wholeData=[];
    var usuarios = db.collection('usuarios').doc(usuarioDatos.email).collection('amigos').onSnapshot(amigos => {
       if (amigos.exists){
            amigos.forEach(amigo =>{

              db.collection('usuarios').doc(amigo).onSnapshot(snapshot => {
                    snapshot.forEach(doc => {
                        wholeData.push(doc.data());
                        console.log('datos amigo:',doc.data());
                  })
                },error => {
                console.log('Error amigos !',amigo );
              })
            });
          this.setState({lista:wholeData,listaFiltro:wholeData});
      }else{
        console.log("no existo");
      }
    },error => {
      console.log('Error obtener colexion amigos!', error);
    });
   }

renderRow ({ item }) {
  console.log( 'item: ',item);
    return (
      <ListItem
        id={item.email}
        title={item.nombre+" "+item.apellido}
        subtitle={item.email}

      />
    )
  }
  render() {
    console.log(this.state);
      return (
      <View style={{justifyContent: 'space-around', justifyContent: 'center'}} >
        <View>
        <Search placeholder='Amigos...'  search = {this.getSearch.bind(this)}/>
        <List>
          <FlatList
            data={this.state.listaFiltro}
              renderItem={this.renderRow}
            keyExtractor={item => item.email}
          />
        </List>
      </View>
      </View>
      );
    }
  _renderItem(item) {
      return (
           <ListItem item={item} onPress={onPress} />
         );
  }
}
