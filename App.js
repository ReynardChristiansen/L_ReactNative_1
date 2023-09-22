import {View, Text,TextInput, Button, StyleSheet, ScrollView, FlatList, Pressable} from 'react-native'
import {useState} from "react";
import ApiCall from './components';

export default function App(){
  const [value, setValue] = useState('');
  const [listOfNotes, setListOfNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  function handleOnChangeText(getEnteredText){
    setValue(getEnteredText)
  }

  function handleOnPressButton(){
    if (value.trim() !== '') {
      setListOfNotes(currentNotes => [...currentNotes, value]);
      setValue(''); 
      setErrorMessage('');
    } 
    else {
      setErrorMessage('Cannot NULL');
    }
  }

  function handleRemoveItem(getCurrentIndex){
      let cpyListOfNotes = [...listOfNotes]
      cpyListOfNotes = cpyListOfNotes.filter((_,index)=> {
        if(getCurrentIndex !== index){
          return true;
        }
        else{
          return false;
        }
      });
        
      setListOfNotes(cpyListOfNotes)
  }


  return(
    <View style={{paddingTop:50, marginLeft:20, marginRight:20}}>
        <View style={styles.inputContainer}>
          <TextInput onChangeText={handleOnChangeText} value={value} style={styles.input} placeholder="Add Your Note Here"></TextInput>
          <Button onPress={handleOnPressButton} color={'#000'} title="Add Noted"/>
        </View> 

        {errorMessage !== '' && (
        <Text>{errorMessage}</Text>
        )}

        <View style={styles.listContainer}>

          <FlatList data={listOfNotes} renderItem={(itemData)=>(
            <Pressable onPress={()=> handleRemoveItem(itemData.index)}>
              <Text style={styles.listItem}>{itemData.item}</Text>
            </Pressable>
            
          )}/>
          {/* {
            listOfNotes.map((item,index)=>  <Text style={styles.listItem} key={`item${index}`}>{item}</Text>)
          } */}

        </View>

        <View>
          <ApiCall/>
        </View>

        

    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer :{
    flexDirection : 'row',
    paddingBottom:30,
    borderBottomWidth:1,
  },
  input:{
    borderWidth:1,
    borderColor:'#ddd',
    flex: 1
  },
  listContainer:{
    paddingTop:30,
  },
  listItem:{
    borderRadius:1,
    borderColor:'red',
    backgroundColor:'green',
    paddingBottom:20,
    marginBottom:20,
    color: 'white',
    fontSize: 15
  },
})


