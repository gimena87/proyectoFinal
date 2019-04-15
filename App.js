/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
 import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createMaterialTopTabNavigator, createSwitchNavigator, createStackNavigator, createAppContainer,createDrawerNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
// import the different screens
import Loading from './screens/Loading'
import SignUp from './screens/SignUp'
import Login from './screens/Login'
import Recorridos from './screens/Recorridos'
import NuevoRecorrido from './screens/NuevoRecorrido'
import DescubriendoRecorrido from './screens/DescubriendoRecorrido'
import Main from './screens/Main'
import Amigos from './screens/Amigos'
import Perfil from './screens/Perfil'
import MapaAmigos from './screens/MapaAmigos'
import BuscarAmigos from './screens/BuscarAmigos'
import BuscarSalidas from './screens/BuscarSalidas'
import Salidas from './screens/Salidas'
import NuevaSalida from './screens/NuevaSalida'
import Configuracion from './screens/Configuracion'
import AlertasActivas from './screens/AlertasActivas'
import NuevaAlerta from './screens/NuevaAlerta'
import {config,appIni} from './screens/Controller'


console.ignoredYellowBox = [
'Setting a timer'
];
const recorridos = createMaterialTopTabNavigator(
        {
          NuevoRecorrido:{
                    screen:NuevoRecorrido,
                    tabBarLabel:'Nuevo Recorrido',
            },

          Recorridos:{
                    screen:Recorridos,
                    tabBarLabel:'Recorridos',
          },

          DescubrirRecorrido:{
                    screen:DescubriendoRecorrido,
                    tabBarLabel:'Descubrir Recorrido',
            },

          },
        {  tabBarOptions: {
              activeTintColor: '#ffedbe',
              inactiveTintColor: '#ece9cb',
              upperCaseLabel: false,
              tabStyle:{
                backgroundColor: '#ef7f3f',
                height:45,
              },
              labelStyle: {
                  fontSize: 10,
                },
              style: {
                 backgroundColor: '#dd5d26',
               },

          }
        }
  );
  const perfil = createMaterialTopTabNavigator(
          { Perfil:{
                      screen:Recorridos,
                      title:'Recorridos',
            },
            Estadisticas:{
                      screen:NuevoRecorrido,
                      title:'Nuevo Recorrido',
              },
            Ranking:{
                      screen:DescubriendoRecorrido,
                      title:'Descubrir Recorrido',
              },

            },
          {  tabBarOptions: {
                activeTintColor: '#ef7f3f',
                activeTintColor: '#ffedbe',
                inactiveTintColor: '#ece9cb',
                upperCaseLabel: false,
                tabStyle:{
                  backgroundColor: '#ef7f3f',
                  height:45,
                },
                labelStyle: {
                    fontSize: 10,
                  },
                style: {
                   backgroundColor: '#dd5d26',
                 },
            }
          }
    );

/*    const mapaAmigos = createStackNavigator(
      {
         MapaAmigos:{
               screen:MapaAmigos ,
               title:'MapaAmigos'
             },
         Perfil:{
           screen: Perfil,
           title:'Perfil'
         },
      },
      {
        initialRouteName: "MapaAmigos",
     }
      );
mapaAmigos.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};*/
  const amigos = createMaterialTopTabNavigator(

          {  MapaOnline:{
                      screen:MapaAmigos,
                      title:'MapaAmigos',
              },
           Amigos:{
                          screen:Amigos,
                          title:'Amigos',
                },
           BuscarAmigos:{
                      screen:BuscarAmigos,
                      title:'Descubrir Recorrido',
              },

            },
          {  tabBarOptions: {
            activeTintColor: '#ffedbe',
            inactiveTintColor: '#ece9cb',
            upperCaseLabel: false,
            tabStyle:{
              backgroundColor: '#ef7f3f',
              height:45,
            },
            labelStyle: {
                fontSize: 10,
              },
            style: {
               backgroundColor: '#dd5d26',
             },}
          }
    );

    const alertas = createMaterialTopTabNavigator(

            {  AlertasActivas:{
                        screen:AlertasActivas,
                        title:'Alertas Activas',
                },
             NuevaAlerta:{
                            screen:NuevaAlerta,
                            title:'Nueva Alerta',
                  },

              },
            {  tabBarOptions: {
              activeTintColor: '#ffedbe',
              inactiveTintColor: '#ece9cb',
              upperCaseLabel: false,
              tabStyle:{
                backgroundColor: '#ef7f3f',
                height:45,
              },
              labelStyle: {
                  fontSize: 10,
                },
              style: {
                 backgroundColor: '#dd5d26',
               },}
            }
      );
    const nuevaSalida =createStackNavigator(
      {
         NuevaSalida:{
               screen:NuevaSalida ,
               title:'Nueva Salida'
             },
         InvitarAmigos:{
           screen: Amigos,
           title:'invitarAmigos'
         },
         DibujarRecorrido:{
           screen: Amigos,
           title:'Dibujar Recorrido'
           }     },
      {
        initialRouteName: "NuevaSalida",
        defaultNavigationOptions: ({navigation})=>({
                                       headerStyle: {backgroundColor: '#dd5d26',  height: 40, },
                                       headerTintColor: 'white',
      })
     }

    );
    const salidas = createMaterialTopTabNavigator(

            {  Salidas:{
                        screen:Salidas,
                        title:'Salidas',
                },
             NuevaSalida:{
                            screen:NuevaSalida,
                            title:'Nueva Salida',
                  },
             BuscarSalidas:{
                        screen:BuscarSalidas,
                        title:'Descubrir Salidas',
                },

              },
            {  tabBarOptions: {
              activeTintColor: '#ffedbe',
              inactiveTintColor: '#ece9cb',
              upperCaseLabel: false,
              tabStyle:{
                backgroundColor: '#ef7f3f',
                height:45,
              },
              labelStyle: {
                  fontSize: 10,
                },
              style: {
                 backgroundColor: '#dd5d26',
               },
              }
            }
      );


// create our app's navigation stac
const menu = createStackNavigator(
  {
     Main:{
           screen:Main ,
           title:'Usuario'
         },
/*     MenuLateral:{
       screen:menuLateral,
       title:'menu'
       },*/
     Recorridos:{
       screen: recorridos,
         navigationOptions:({navigation})=>({
                                         title:"Recorridos",
                                         headerStyle: {backgroundColor: '#dd5d26',  height: 40, },
      })
     },
     Amigos:{
       screen: amigos,
         navigationOptions:({navigation})=>({
                                         title:"Amigos",
                                         headerStyle: {backgroundColor: '#dd5d26',  height: 40, },
                                         })
     },
     Perfil:{
       screen: Perfil,
         navigationOptions:({navigation})=>({
                                         title:"Perfil",
                                         headerStyle: {backgroundColor: '#dd5d26',  height: 40, },
                                         })
     },
     Salidas:{
       screen: salidas,
       navigationOptions:({navigation})=>({
                                       title:" Salidas",
                                       headerStyle: {backgroundColor: '#dd5d26',  height: 40, },
                              /*         headerRight: <Text>
                                                      <Icon name="bars"
                                                         size={20}
                                                         alignItems='left'
                                                         color="#FFF"
                                                         />
                                                    </Text>,*/
                                       })
                                    },
     Alertas  :{
       screen: alertas,
       navigationOptions:({navigation})=>({
                                       title:" Alertas",
                                       headerStyle: {backgroundColor: '#dd5d26',  height: 40, },
                                     })
    },
     NuevaSalida:NuevaSalida,
  },
  {
    initialRouteName: "Main",
    defaultNavigationOptions: ({navigation})=>({
                                   headerStyle: {backgroundColor: '#dd5d26',  height: 40, },
                                   headerTintColor: 'white',

    })
 }

);

const App =  createAppContainer(createSwitchNavigator(
  {Loading:Loading, SignUp:SignUp, Login:Login, Menu:menu},
  { initialRouteName: 'Loading'}))


export default App;
