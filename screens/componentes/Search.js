import React from 'react'
import { SearchBar } from 'react-native-elements';

export default class Search extends React.Component{
  state = {
     search: '',
   };

   updateSearch = search => {
     this.props.search(search);
   };
   constructor(props){
     super(props);
   }

   render() {
    // const { search } = this.state;

     return (
       <SearchBar
         inputContainerStyle= {{backgroundColor: '#ef7f3f', borderWidth: 1, borderRadius: 5}}
         inputStyle = {{backgroundColor:'#fff'}}
         placeholder={this.props.placeholder}
         roundTheme
         round
         onChangeText={this.updateSearch}
         autoCorrect = {false}
       />
     );
   }
}
