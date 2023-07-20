import { StyleSheet, Text, View, Pressable, Image, SafeAreaView, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { auth } from '../../config/firebase/firebase';
import { currentUser } from '../../config/firebase/autenticacao';

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
    <ScrollView>
      <View style={styles.container}>

        <Text style={{
          fontStyle: 'italic',
          fontSize: 72, color: '#ffd358',
          paddingTop: 56
        }}>Olá</Text>

        <View style={styles.texting}>

          <Text style={{ fontSize: 16, color: '#757575' }}>
            {"\t"}{"\t"}Bem vindo ao Meau!{"\n"}
            Aqui você pode adotar, doar e ajudar{"\n"}
            {"\t"}cães e gatos com facilidade.{"\n"}
            {"\t"}{"\t"}Qual o seu interesse?</Text>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => alert('Click.')}>
              <Text style={styles.buttonLabel} onPress={() => navigation.navigate('Lista Pets')}>ADOTAR</Text>
            </Pressable>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Cadastro Animal')}>
              <Text style={styles.buttonLabel}>CADASTRAR ANIMAL</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.loginButton}>
          <Pressable onPress={signOut}>
            <Text style={{ fontSize: 16, color: '#88c9bf' }}>Sair</Text>
          </Pressable>
        </View>

        <View style={styles.imageContainer}>
          <Image source={PlaceholderImage} style={styles.image} />
        </View>

      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  texting: {
    paddingTop: 52,
    paddingBottom: 44
  },
  loginButton: {
    paddingTop: 116,
    paddingBottom: 68,
  },
  image: {
    width: 122,
    height: 44,
  },
  buttonContainer: {
    width: 232,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 2,
    paddingBottom: 12,
    backgroundColor: '#ffd358',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#434343',
    fontSize: 12,
  },
});