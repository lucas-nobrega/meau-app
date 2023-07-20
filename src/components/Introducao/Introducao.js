import { StyleSheet, Text, View, Pressable, Image, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { auth } from '../../config/firebase/firebase';
import { currentUser } from '../../config/firebase/autenticacao';
import ChatComponent from './Chat';

const PlaceholderImage = require('./../../../assets/logo-introducao.png');

import SignIn from '../SignIn';

export default function Intruducao({ navigation }) {
  function signOut() {
    auth.signOut()
    console.log('Saindo!');
    return <SignIn />
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <ChatComponent />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});