import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity , TextInput} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner } from 'expo-barcode-scanner' ;


export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      hasCameraPermissions : null,
      scanned : false,
     // scannedData : "",
      buttonState : "normal",
      scannedStudentId : "",
      scannedBookId : "",

      
    } 

  }

  getCameraPermissions =async(id)=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
     this.setState ({
       hasCameraPermissions : status==="granted",
       buttonState : id,
       scanned : false,
        

     })
    } 

    handleBarCodeScanned = async({type,data})=>{
      const {buttonState } = this.state 
      if (buttonState==="bookId") {
        this.setState({
          scanned : true,
          scannedBookId : data,
          buttonState : "normal",
        
        
        })
      } 
      else if(buttonState==="studentId") {
        this.setState({
          scanned : true,
          scannedStudentId : data,
          buttonState : "normal",
        
        
        })
      }

    }
  render(){

    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
      if (buttonState!=="normal" && hasCameraPermissions){
      return(
       <BarCodeScanner
       onBarCodeScanned = {
       
        scanned ? undefined :  this.handleBarCodeScanned 

       }

       style = {StyleSheet.absoluteFillObject}
       
      />
      )
      }
      else if (buttonState==="normal"){
      return(
        <View style={styles.container}>

        <View style = {styles.inputView}>
               <TextInput value={this.state.scannedStudentId} style= {styles.inputBox} placeholder = "studentId"/> 
               <TouchableOpacity style = {styles.scanButton}> onPress = {()=>{
                 this.getCameraPermissions ("studentId")
               }}
                 <Text style = {styles.buttonText}> scan </Text>
                </TouchableOpacity>  
               
          </View>

          <View style = {styles.inputView}>
               <TextInput value={this.state.scannedBookId} style= {styles.inputBox} placeholder = "bookId" value=""/> 
               <TouchableOpacity style = {styles.scanButton} onPress = {()=>{
                 this.getCameraPermissions("bookId")

               }} > 
                 <Text style = {styles.buttonText}> scan </Text>
                </TouchableOpacity>  
               
          </View>
      </View>
      )

      }


     
    
  }
  
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

   buttonBg : {
     backgroundColor : "black",
     padding : 10,
     margin : 10,

   },
   buttonText : {
     color : "white"
   },
   inputBox : {
     width : 200,
     height : 40,
     borderWidth : 1.5,
     borderRightWidth : 0,
     fontSize : 20,
     
   },

   inputView : {
     flexDirection : "row",
     margin : 20,

   },
   
   scanButton : {
     backgroundColor : "black",
     width : 50,
     borderWidth : 1.5,
     borderLeftWidth :0,
   },

   buttonText : {
     fontSize : 20,
     textAlign : "center",
     color : "white",
        
       }

  });