import { db } from '../config/firebase/firebase';
import { currentUser } from '../config/firebase/autenticacao';
import { query, collection, addDoc, doc, updateDoc, getDocs, setDoc, where, deleteDoc } from 'firebase/firestore';

async function sendPushNotification(message) {
    /* const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    }; */

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

const usuarioService = {
    
    async SendNotificationToAnimalOwner(animal) {
        // DEPOIS QUE O USUARIO ENTRAR NA LISTA DE INTERESSADOS
        // get user expoPushToken by animal.responsavelId
        const docRef = doc(db, "usuarios", animal.responsavelId);
        const docSnap = await getDocs(docRef);
        if (docSnap.exists()) {
            if (docSnap.data().expoPushToken) {
                // send notification to user
                console.log("expoPushToken: ", docSnap.data().expoPushToken);
                const message = {
                    to: docSnap.data().expoPushToken,
                    sound: 'default',
                    title: 'Seu pet tem um novo interessado!',
                };
                sendPushNotification(message);
            }
        } else {
            console.log("Usuario nao encontrado");
        }
    },
    async buscaInteressados(idAnimal) {
        console.log("idAnimal: ", idAnimal);
        const q1 = query(collection(db, "adocao"), where("idAnimal", "==", idAnimal));
        const querySnapshot = await getDocs(q1);
        const listaAdocao = querySnapshot.docs.map(doc => doc.data());

        const listaInteressados = []

        for (var interessado in listaAdocao) {
            const user = listaAdocao[interessado].idInteressado;
            const q2 = query(collection(db, "usuarios"), where("id", "==", user));
            const querySnapshot2 = await getDocs(q2);
            listaInteressados.push(querySnapshot2.docs.map(doc => doc.data())[0]);
        }
        console.log("Lista de pessoas interessadas:", listaInteressados)
        return listaInteressados;
    },
    async insereInteressados(idAnimal) {
        console.log("idAnimal: ", idAnimal);
        try {
            const message = {
                Resposta: false,
                idAnimal: idAnimal,
                idInteressado: currentUser().uid,
            };
            await addDoc(collection(db, "adocao"), message);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        
    },
    async removeInteressados(animalId, idInteressado) {
        try {
            // Obtém a referência para o documento na coleção 'animais' com o ID especificado
            const chatColRef = collection(db, "adocao");
            const q = query(
                chatColRef,
                where('idInteressado', '==', idInteressado),
                where('idAnimal', '==', animalId),
            );
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref);
            });

        } catch (error) {
            console.error('Erro ao buscar o campo responsavelId:', error);
            return null;
        }
    }
}

export default usuarioService;
// Pegar o animalId
        // Pegar o responsavelId do animal
        // Pegar o expoPushToken do responsavelId
        // Enviar a notificação