import React from 'react'
import {ScrollView,StyleSheet,Text,View,FlatList} from 'react-native'
import { List, ListItem } from "react-native-elements";

export default class ListaDatos extends React.Component{

 constructor(props){
   super(props);
   this.state={detalle:false};
  this.gotoDetail = this.gotoDetail.bind(this);
  this.renderRow = this.renderRow.bind(this);
 }
//itemSeleccionado = (item)=>(console.log(item))
 gotoDetail = (user) => {
   this.props.seleccion(user);
}

renderRow ({ item }) {
 if(this.props.listaAmigos){
      return ( <ListItem
            leftAvatar={{
              title:item.nombre,
              source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' },
              showEditButton: false,
            }}
            title={item.nombre}
            subtitle={item.descripcion}
            chevron
          />);
        }else{
          return(<ListItem
          id = {item.key}
          title={item.nombre}
          subtitle={item.descripcion}
        //  onPress={itemSeleccionado(item.key)}
          onPress={()=>this.gotoDetail(item)}
        />
      );
    }
    }

    render() {

        return (
          <ScrollView  style = {styles.container} >
            <List>
              <FlatList
                  data={this.props.data}
                  renderItem={this.renderRow.bind(this)}
                  keyExtractor={item => item.nombre}
                />
          </List>
        </ScrollView>
        );
      }
}

const styles = StyleSheet.create({
 container:{
   backgroundColor:'#e3f6ce',
   //marginTop:5,
 }
});
