
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from "react-navigation-tabs";
import {createAppContainer} from "react-navigation";
import TransactionScreen from "./screens/TransactionScreen"
import SearchScreen from "./screens/SearchScreen";
export default class App extends React.Component {
  render(){return   <AppContainer/>
   
  }
  
}


var AppNavigator = createBottomTabNavigator({
  TransactionScreen : TransactionScreen,
  SearchScreen : SearchScreen
});

const AppContainer = createAppContainer(AppNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
