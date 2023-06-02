
import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { signInUser } from '../../config/firebase/autenticacao';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';


export default function SignIn({ navigation }) {

  /* const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth); */

  function handleSignIn(e) {
    e.preventDefault();
    //signInWithEmailAndPassword(email, password);
  }

/*   if (loading) {
    return <Text>carregando...</Text>;
  }

  if (user) {
    return console.log(user);
    <CadastroPessoal />
  }

  if (error) {
    return console.log(error.code);
  } */

  return (
    <SafeAreaView style={{ marginTop: 64 }}>
      <Formik
        initialValues={{ email: '', senha: '' }}
        onSubmit={(values) => {
          signInUser(values.email, values.senha);
          navigation.navigate('Home');
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>

            <View>
              <TextInput
                placeholder='E-mail'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <TextInput
                placeholder="Password"
                //secureTextEntry={true}
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                value={values.senha}
              />
            </View>

            <View>
              <Button
                onPress={handleSignIn}
              >
                ENTRAR
              </Button>
              <Button
                icon="facebook"
                onPress={() => console.log('facebook')}
              >
                ENTRAR COM FACEBOOK
              </Button>
              <Button
                icon="google"
                onPress={() => console.log('aye')}
              >
                ENTRAR COM GOOGLE
              </Button>
              <Button
                onPress={() => navigation.navigate('Cadastro Pessoal')}
              >
                cadastrar
              </Button>

            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}