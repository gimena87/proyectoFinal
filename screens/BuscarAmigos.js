import React from 'react';
import {View,ScrollView} from 'react-native';
import Search from './componentes/Search';
import {Button} from 'react-native-elements';
import FiltroAmigos from './componentes/FiltroAmigos';
import ListaDatos from './componentes/ListaDatos';
import Perfil from './Perfil';
 import {db} from './Firebase'
 import {obtenerDatosUser,usuarioDatos} from './Controller';

export default class BuscarAmigos extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      lista:[],
      listaFiltrada:[],
        search:'',
        datosAmigo:[],
        mostrarPerfil:false,
        filtroHabilitado:false,
        userEmail:"",
    }
  }
  componentDidMount(){
    var usersA =[];
    existeLista = true;
    userActEmail =usuarioDatos.email;
    db.collection("usuarios").get().then(users =>{
        users.forEach( user =>{
          emailU = user.data().email;
          console.log("userActEmail== emailU",userActEmail==emailU);
        if(userActEmail==emailU){
            console.log("entro if");
        }else{
          if(existeLista){
            db.collection("usuarios").doc(userActEmail).collection('amigos').get()
              .then(userAmigos => {
                  if(userAmigos.exist){
                    db.collection("usuarios").doc(userActEmail).collection('amigos').doc(user.email).get()
                    .then(userAmigo =>{
                      if (!userAmigo.exists){
                        this.setState({lista:[...this.state.lista,user.data()],listaFiltrada:[...this.state.listaFiltrada,user.data()],userEmail:userActEmail});
                      }else{
                        console.log('existe');
                      }
                    })
                    .catch(er =>{
                      });
                  }else{
                      existeLista = false;
                      this.setState({lista:[...this.state.lista,user.data()],listaFiltrada:[...this.state.listaFiltrada,user.data()],userEmail:userActEmail});
                    console.log('else no exite lista',usersA);
                    }
               })
               .catch(er =>{
                  console.log(er);
                });
              }else{
                usersA.push(user.data());

                this.setState({lista:[...this.state.lista,user.data()],listaFiltrada:[...this.state.listaFiltrada,user.data()],userEmail:userActEmail});
              }
            }

          });
      });
   }

  getKilometros = function(lat1,lon1,lat2,lon2)
   {
   rad = function(x) {return x*Math.PI/180;}
  var R = 6378.137; //Radio de la tierra en km
   var dLat = rad( lat2 - lat1 );
   var dLong = rad( lon2 - lon1 );
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
   var d = R * c;
  return d.toFixed(3); //Retorna tres decimales
   }

amigosCercanos = (usuarioActual,amigosUsuarioDescubierto)=>{
  amigosCercanos =[];
  amigosUsuarioDescubierto.forEach(amigosUsuarioD =>{
      obtenerDatosUser(amigosUsuarioD.email).then(datosAmigo=>{
          if(parseInt(getKilometros(usuarioActual.posicion.latitude,usuarioActual.posicion.longitud,datosAmigo.posicion.latitude,datosAmigo.posicion.longitude))<= 10)
            {
                amigosCercanos.push(datosAmigo);
              }
    })
  });
  return amigosCercanos;
}
ultimosInscriptos = (posiblesAmigos)=>{
  amigosUI =[];
  fechaActual = new Date().getTime();
  posiblesAmigos.forEach(amigosU =>{
      obtenerDatosUser(amigosU.email).then(datosAmigo=>{
        fechaInsc = new Date(datosAmigo.fecha).getTime();
        diff = fechaActual - fechaInsc;
        dias =(diff/(1000*60*60*24));
          if(dias<10) {
                amigosUI.push(datosAmigo);
          }
    })
  });
  return amigosUI;
}
obtenerAmigosEnComun = (amigosUsuarioActual,amigosUsuarioDescubierto)=>{
 cantUA=amigosUsuarioActual.lenght;
 cantUD=amigosUsuarioDescubierto.lenght;
 amigosEnComun =[];
 if (cantUA<=cantUD){ //recorro el arreglo mas corto
   cantUA.forEach(amigo =>{
     if (amigosUsuarioDescubierto.includes(amigo.email)){
        amigosEnComun.push(amigo);
     }
   }
   );
 }
 return amigosEnComun;
}
  getChecks = (check)=>{
     var amigos = [];
    db.collection('usuarios').
    doc(this.state.userEmail).onSnapshot(snapshot => {
      if (snapshot.exist){
          snapshot.forEach(doc => {
            amigosUsuario = doc.data().amigos;
          })
        }
   }, err => {
      console.log('Error!', error);
    });
   var wholeData = [];
       db.collection('usuarios').where("usuario", "<=",this.state.userEmail).where("usuario", ">=",this.state.userEmail).onSnapshot(snapshot => {
         if (snapshot.exist){
         snapshot.forEach(doc => {//cada usuario de la lista de usuarios
           var datos=doc.data();
           if (!amigosUsuario.includes( datos.email )){ // si no es amigo
             if(!check.ck1 && !check.ck2 && !check.ck3){ //todos los casos
               wholeData.push(datos); //agrego todos los usuarios
             }else if(check.ck1 && !check.ck2 && !check.ck3){//buscar amigos en comun
                obtenerAmigosEnComun(amigosUsuario,datos.amigos).then(amigos=>{
                wholeData.push(amigos);
              });
             }else if(check.ck1 && check.ck2 && !check.ck3){//buscar amigos en comun  y  cerca mio
                obtenerAmigosEnComun(amigosUsuario,datos.amigos).then(amigosC=>{
                  amigosCercanos(usuarioDatos,amigosC).then(amigosCerc =>{
                    wholeData.push(amigosCerc);
                  })
                });
             }else if(check.ck1 && check.ck2 && check.ck3){//buscar amigos en comun  y  cerca mio y ultimos agregados
                obtenerAmigosEnComun(amigosUsuario,datos.amigos).then(amigosC=>{
                  amigosCercanos(amigosC,datos.amigos).then(amigosCerc =>{
                    ultimosInscriptos(amigosCerc).then(amigosUltInsc =>{
                      wholeData.push(amigosUltInsc,datos.amigos);
                    })
                  })
                })
              }else if(!check.ck1 && check.ck2 && !check.ck3){//buscar cerca mio
                amigosCercanos(amigosUsuario,datos.amigos).then(amigosCerc =>{
                    wholeData.push(amigosCerc);
                });
              }else if(!check.ck1 && !check.ck2 && check.ck3){//buscar amigos utima inscriptos
                ultimosInscriptos(amigosCerc).then(amigosUltInsc =>{
                  wholeData.push(amigosUltInsc,datos.amigos);
                });
              }else if(!check.ck1 && check.ck2 && check.ck3){//buscar ultimos agregados cerca mio
                  amigosCercanos(amigosC,datos.amigos).then(amigosCerc =>{
                    ultimosInscriptos(amigosCerc).then(amigosUltInsc =>{
                      wholeData.push(amigosUltInsc,datos.amigos);
                    });
                  });
              }else if(check.ck1 && !check.ck2 && check.ck3){//buscar amigos en comun  y  ultimos agregados
                amigosCercanos(amigosC,datos.amigos).then(amigosCerc =>{
                  ultimosInscriptos(amigosCerc).then(amigosUltInsc => {
                    wholeData.push(amigosUltInsc,datos.amigos);
                  })
                })
              }
            }
         this.setState({lista:wholeData,listaFiltrada:wholeData});
       });
     }
      }, err => {
         console.log('Error!', error);
       })

  }
  getSearch(search){
     const list = this.state.lista;
     const newData = list.filter(item => {
     const itemData = `${item.nombre.toUpperCase()} ${item.descripcion.toUpperCase()}`;
     const textData = search.toUpperCase();
     return itemData.indexOf(textData) > -1;
   });
   this.setState({
     listaFiltrada: newData,
   });
  }

  getResponse(datosAmigo){
    console.log('datosAmigo',datosAmigo);
       this.setState({mostrarPerfil:true,datosAmigo:datosAmigo});
   }
   cancelar = ()=>{
     this.setState({filtroHabilitado:false});
   }

  render(){
    console.log('usuarios no amigos',this.state.mostrarPerfil)
    return(
      <View>
      {!this.state.mostrarPerfil?
        <ScrollView>
          <View>
          <Search placeholder="Buscar Recorridos..." search = {this.getSearch.bind(this)} />
            {this.state.filtroHabilitado ? <FiltroAmigos filtros={this.getChecks.bind(this)} cancelar={this.cancelar.bind(this)}/>
            :<Button
              buttonStyle={{ height: 30, backgroundColor: "#a7cb68"}}
              onPress={()=>this.setState({filtroHabilitado:!this.state.filtroHabilitado})}
              title="Filtrar"
            />}
          <ListaDatos data={this.state.listaFiltrada} seleccion={this.getResponse.bind(this)}/>
          </View>
        </ScrollView>
      : <View><Perfil usuario ={this.state.datosAmigo} /></View>
    }
  </View>);
  }
}
