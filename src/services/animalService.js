import { db } from '../config/firebase/firebase';
import { query, collection, getDocs, addDoc } from 'firebase/firestore';

const animalService = {
    async getAnimals() {
        const q = query(collection(db, "animais"));
        const querySnapshot = await getDocs(q);
        const animals = querySnapshot.docs.map(doc => doc.data());
        console.log("Document data:", animals);
        return animals;
    },
    //PEGAR ANIMAIS QUE PODER SER ADOTADOS E QUE NÃO SÃO DO USUÁRIO
    // Documentação: https://firebase.google.com/docs/firestore/query-data/queries?hl=pt&authuser=0
    async getAnimalsAdoption(userId) {
        const q = query(collection(db, "animais"), where("paraAdocao", "==", true), where("respoensavelId", "!=", userId));
        const querySnapshot = await getDocs(q);
        const animalsAdoption = querySnapshot.docs.map(doc => doc.data());
        console.log("Animais para adoção:", animalsAdoption);
        return animalsAdoption;
    },
    //PEGAR ANIMAIS QUE TENHAM O MEU RESPONSAVELID
    async getMyAnimals(userId) {
        const q = query(collection(db, "animais"), where("respoensavelId", "==", userId));
        const querySnapshot = await getDocs(q);
        const myAnimals = querySnapshot.docs.map(doc => doc.data());
        console.log("Meus animais:", myAnimals);
        return myAnimals;
    },
    async createAnimal(animal) {
        const docRef = await addDoc(collection(db, "animais"), animal);
        console.log("Document written with ID: ", docRef.id);
    },
    async getAnimalById(id) {
        const q = query(collection(db, "animais"));
        const querySnapshot = await getDocs(q);
        const animals = querySnapshot.docs.map(doc => doc.data());
        return animals.find(animal => animal.id === id);
    }
}

export default animalService;
