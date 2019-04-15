import firebase, {db} from './Firebase';
import firebaseN from 'react-native-firebase';

 export let config = {
    apiKey: "AIzaSyCY8v97LHoBaG-n5f_MqU1AGkq5LeWQwEw",
    databaseURL: "https://cyclezone-6b16e.firebaseio.com/",
    projectId: "cyclezone-6b16e"
  };

//export let appIni = firebase.initializeApp(config);

export const usuarioDatos = firebaseN.auth().currentUser && firebaseN.auth().currentUser.toJSON();
export const posActual = ()=>{
  coords=[];
  navigator.geolocation.getCurrentPosition(
  posicion => {
        coords= {latitude: posicion.coords.latitude,
        longitude: posicion.coords.longitude};
      }).then(()=>{ return coords});
}
export const addElemento =  (item,tabla,tablaPadre,id) => {
  if (tablaPadre==null){
      tablaRef = db.collection(tabla);
      var addEl= tablaRef.add(item).then(ref => {
        console.log('Se agrego el recorrido',ref.id);
        return ref.id;
  });

  }else{// es un subcampo
    //  console.log( 'llego',db.collection('usuarios').doc('KjVYU1KeN4pbdFLu0o5B').collection('recorridos').add(item));
      tablaRef = db.collection('usuarios').doc('KjVYU1KeN4pbdFLu0o5B').collection('recorridos').doc(id);
      var addEl= tablaRef.add(item).then(ref => {
    console.log('Se agrego recorrido al usuario: ');

  });
  }
  //  tablaRef = db.collection(tabla);
}
export const fechaActual = ()=>{
  var hoy = new Date();
  var dd = hoy.getDate();
  var mm = hoy.getMonth()+1; //hoy es 0!
  var yyyy = hoy.getFullYear();
  return dd+"/"+mm+"/"+yyyy;
}
export const addRecorrido = (item,usuario) =>{
  //creo registro en tabla recorrido
    tablaRef = db.collection('recorridos');
    tablaRef.add(item).then(ref => {
      console.log('Se agrego el recorrido',ref.id);
      tablaRef2 = db.collection('usuarios').doc(usuario).collection('recorridos').doc(ref.id);
      tablaRef2.set(item).then(ref => {
    console.log('Se agrego recorrido al usuario: ');

  });
});
}
export const addRecorridoExistente =(item,usuario) => {

  tablaRef2 = db.collection('usuarios').doc(usuario).collection('recorridos').doc(item.id);
  delete item.id;
  tablaRef2.set(item).then(ref => {
      console.log('Se agrego recorrido al usuario: ');
});
}

export const guardarEstadistica = (recorrido,km,tiempo,usuario) => {
  tablaRef = db.collection('recorridos').doc(recorrido).collection('estadisticas').add({
    tiempo:tiempo,
    km:km,
    usuario:usuario,
    fecha:(new Date()).toString(),
  }).then(
    tablaRef2 = db.collection('usuarios').doc(usuario).collection('recorridos').doc(recorrido).collection('estadisticas').add({
      tiempo:tiempo,
      km:km,
      fecha:(new Date()).toString(),
    })
  )
  ;
}
export const activarVisibilidad = (recorrido,usuario,pos) => {
    tablaRef2 = db.collection('usuariosOnline').doc(usuario).set({
      recorrido:recorrido,
      posicionActual:pos,
    });
}

export const actualizarPos = ()=>{

}
export const encontrarCoordenadas = () => {
  navigator.geolocation.getCurrentPosition(
    posicion => {
      return({
     region: {
      latitude: posicion.coords.latitude,
      longitude: posicion.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    markers: [{
      latlng: {
        latitude: posicion.coords.latitude,
        longitude: posicion.coords.longitude,
      },
    }],
  });
    },
    error => {
   },
  );
}

export const agregarUsuario = (user) => {
  db.collection('usuarios').doc(user.email).set({
    nombre: user.nombre,
    email: user.email,
    apellido: user.apellido,
    visible: user.visible,
    posicion: user.posicion
  })
  .then(function() {
      console.log("Guardadoooooooooooooooooooo");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
}
export const updateElemento =  (item) => {
    console.log(item);
/**    db.ref('/recorridos').push({
        name: item
    });*/
}

export const obtenerDatosUser = (user) => {
  return db.collection('usuarios').doc(user).get();
}
export const deleteElemento =  (item) => {
    console.log(item);
/**    db.ref('/recorridos').push({
        name: item
    });*/
}

export const listaDatos = (filtro,val,tabla) =>{
  console.log('listaDatos');
  citiesRef = db.collection('recorridos');
  console.log('citiesRef');
  var allCities = citiesRef.get()
    .then(snapshot => {
              snapshot.forEach(doc => {
                if (!doc.exists) {
                console.log('No such document!');
                return [];
              } else {
                console.log('Document data:', doc.data());
                  return (doc.data());
              }

          });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
      console.log('allCities');
        console.log(allCities);
}
