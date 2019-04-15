import React from 'react';
import {View,StyleSheet} from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'

export default class MapaGeneradorCaminos extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          region: {
            latitude: -38.705118,
            longitude: -62.278847,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        };
  }

 addDatosForm = (result) => {
                     var tiempo =result.duration;
                     var km = result.distance;
                     var coord =result.coordinates;
                     this.props.datos({tiempo:tiempo,km:km,coord:coord});
                   }

  render(){
    console.log('this.props.origin',this.props.origin);
    console.log('this.props.destination',this.props.destination);
    origen = (this.props.origin)?this.props.origin:[];
    destino = (this.props.destination)?this.props.destination:[];
    coordValida = origen.latitude && destino.latitude;
    console.log('render coodValida:'+coordValida);
    return(
      <View>
        <MapView
              style = {styles.map}
                  initialRegion={
                  this.state.region
                }
                  showsUserLocation = {true}
                  followUserLocation = {true}
                  zoomEnabled = {true}>

                  {coordValida!=undefined &&
                   <MapViewDirections
                              origin={origen}
                              destination={destino}
                               mode ={"bicycling"}
                              apikey='AIzaSyDN30Cqhe2v7tVYm2f6p2Y5ClsFhnosYhA'
                              strokeWidth={3}
                               strokeColor="hotpink"
                              onReady={result=>{
                                console.log(result);
                                this.addDatosForm(result);
                              }}
                              onError={(errorMessage) => {
                                 console.log(errorMessage);
                               }}
                            />
                          }


         </MapView>
        </View>
        );

}
}
const styles = StyleSheet.create ({
   map: {
      height: 200,
   }
});
