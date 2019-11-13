import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MainScreen from './screens/LoginScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{height: 24}}/>
      <MainScreen/>
      <View style={{alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: "rgba(102,102,102,0.5)", height: 40}}><Text style={{textAlign: 'center'}}>ID2216 Mobile Applications Developement Web Application.</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});