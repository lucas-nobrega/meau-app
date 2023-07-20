
import React, { useState, useRef, useEffect } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { signInUser } from '../../config/firebase/autenticacao';
import axios from 'axios';
import { registerForPushNotificationsAsync } from '../../config/firebase/autenticacao';
import * as Notifications from 'expo-notifications';


// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
/* async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
} */

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function SignIn({ navigation }) {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      //console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={{ marginTop: 64 }}>
      <View>
        <Formik
          initialValues={{ email: 'gustavo@gmail.com', senha: '123456' }}
          onSubmit={(values) => {
            //setLoading(true);
            //console.log("values: ", values)
            signInUser(values);
            //navigation.navigate('Home');
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextInput
                placeholder='E-mail'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <TextInput
                placeholder='Senha'
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                value={values.senha}
              />
              <Button
                onPress={handleSubmit}
                loading={loading}
              >
                ENTRAR
              </Button>
            </View>
          )}
        </Formik>
        <View>
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
    </SafeAreaView>
  );
}