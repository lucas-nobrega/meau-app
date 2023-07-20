import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { db } from './firebase';
import { collection, addDoc, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { set } from "react-native-reanimated";

const auth = getAuth();

export const signUpUser = (userDetails) => {
    //deconstruct the users details we will need these later
    const { nome, idade, email, estado, cidade, endereco, telefone, username, senha, foto } = userDetails;
    //user firebase using the appropriate firebase method
    createUserWithEmailAndPassword(auth, email, senha)
        .then((res) => {
            console.log("Resposta da criacao do User: ", res);
            //Once the user creation has happened successfully, we can add the currentUser into firestore
            //with the appropriate details.
            const currentUser = auth.currentUser
            const uid = currentUser.uid
            //create a user profile object
            const userProfileData = {
                id: uid,
                nome: nome,
                idade: idade,
                email: email,
                estado: estado,
                cidade: cidade,
                endereco: endereco,
                telefone: telefone,
                username: username,
                foto: foto,
                expoPushToken: ''
            }
            // create a users collection in firestore and add the userProfile object
            setDoc(doc(db, "usuarios", uid), userProfileData)
                .then(() => {
                    console.log('User added to firestore');
                    try {
                        registerForPushNotificationsAsync().then(token => {
                            saveDeviceToken(token, user.uid);
                            console.info("Token salvo com sucesso! ", token);
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
                )
                .catch(error => {
                    console.log('Something went wrong with added user to firestore: ', error);
                }
                )
        })
        //we need to catch the whole sign up process if it fails too.
        .catch(error => {
            console.log('Something went wrong with sign up: ', error);
        }
        )
}

export async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

const saveDeviceToken = async (token, userId) => {
    const userRef = doc(db, "usuarios", userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        // update expoPushToken
        updateDoc(userRef, {
            expoPushToken: token
        });
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

export const signInUser = (userData) => {

    const { email, senha } = userData;
    
    signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            try {
                registerForPushNotificationsAsync().then(token => {
                    saveDeviceToken(token, user.uid);
                    console.info("Token salvo com sucesso! ", token);
                });
            } catch (error) {
                console.log(error);
            }
            console.log('User signed in!');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
}

export const signOutUser = () => {
    signOut(auth)
        .then(() => {
            console.log('User signed out!')
        })
        .catch(error => {
            console.log('Something went wrong with sign out: ', error);
        }
        )
}

export const currentUser = () => {
    return auth.currentUser;
}

export const isLogged = () => {
    const user = currentUser();
    if (user) {
        return true;
    } else {
        return false;
    }
}