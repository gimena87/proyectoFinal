import React from 'react'
import RNFetchBlob from "react-native-fetch-blob"
import {View,StyleSheet} from 'react-native'
import{Avatar} from 'react-native-elements'
var ImagePicker = require('react-native-image-picker');
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
/*
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
*/
export default class Configuracion extends React.Component{

constructor(props){
      super(props);
      this.getImage = this.getImage.bind(this)
      this.state={
         usuario:[],
         image_uri: 'https://avatars0.githubusercontent.com/u/12028011?v=3&s=200'
      }
    }
/*
    uploadImage(uri, mime = 'application/octet-stream') {
     return new Promise((resolve, reject) => {
       const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
       let uploadBlob = null

       const imageRef = FirebaseClient.storage().ref('images').child('image_001')

       fs.readFile(uploadUri, 'base64')
         .then((data) => {
           return Blob.build(data, { type: `${mime};BASE64` })
         })
         .then((blob) => {
           uploadBlob = blob
           return imageRef.put(blob, { contentType: mime })
         })
         .then(() => {
           uploadBlob.close()
           return imageRef.getDownloadURL()
         })
         .then((url) => {
           resolve(url)
         })
         .catch((error) => {
           reject(error)
       })
     })
   }

   getImage(){

     ImagePicker.showImagePicker(options, (response) => {
       console.log('Response = ', response);

       if (response.didCancel) {
         console.log('User cancelled image picker');
       }
       else if (response.error) {
         console.log('ImagePicker Error: ', response.error);
       }
       else if (response.customButton) {
         console.log('User tapped custom button: ', response.customButton);
       }
       else {
         // let source = { uri: response.uri };
         // this.setState({image_uri: response.uri})

         // You can also display the image using data:
         // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };

       this.uploadImage(response.uri)
         .then(url => { alert('uploaded'); this.setState({image_uri: url}) })
         .catch(error => console.log(error))

       }
     });

   }
*/

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to our Example using Firebase Storage and Camera!
        </Text>
        <Image
            style={{width: 100, height: 100}}
            source={{uri: this.state.image_uri}}
          />
        <Button
      //    onPress={this.getImage}
          title="Change Image"
          color="#841584"
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
