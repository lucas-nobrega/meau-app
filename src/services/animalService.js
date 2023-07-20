import { db } from '../config/firebase/firebase';
import { query, collection, getDocs, addDoc, where } from 'firebase/firestore';

const animalService = {
    async getAnimals() {
        const q = query(collection(db, "animais"));
        const querySnapshot = await getDocs(q);
        const animals = querySnapshot.docs.map(doc => doc.data());
        //console.log("Document data:", animals);
        return animals;
    },
    //PEGAR ANIMAIS QUE PODER SER ADOTADOS E QUE NÃO SÃO DO USUÁRIO
    // Documentação: https://firebase.google.com/docs/firestore/query-data/queries?hl=pt&authuser=0
    async getAnimalsAdoption(userId) {
        //const q = query(collection(db, "animais"), where("paraAdocao", "==", true), where("respoensavelId", "!=", userId));
        // Como pegar o ID do usuário
        const q = query(collection(db, "animais"), where("paraAdocao", "==", true));
        const querySnapshot = await getDocs(q);
        const animalsAdoption = querySnapshot.docs.map(doc => doc.data());
        //console.log("Animais para adoção:", animalsAdoption);
        return animalsAdoption;
    },
    //PEGAR ANIMAIS QUE TENHAM O MEU RESPONSAVELID
    async getMyAnimals(userId) {
        const q = query(collection(db, "animais"), where("responsavelId", "==", userId));
        const querySnapshot = await getDocs(q);
        const myAnimals = querySnapshot.docs.map(doc => doc.data());
        //console.log("Meus animais:", myAnimals);
        return myAnimals;
    },
    async createAnimal(animal) {
        const docRef = await addDoc(collection(db, "animais"), animal);
        //console.log("Document written with ID: ", docRef.id);
    },
    async getAnimalById(id) {
        const q = query(collection(db, "animais"));
        const querySnapshot = await getDocs(q);
        const animals = querySnapshot.docs.map(doc => doc.data());
        return animals.find(animal => animal.id === id);
    },
    async getIdAnimal() {
        const q = query(collection(db, "animais"));
        const querySnapshot = await getDocs(q);
        const animalsId = querySnapshot.docs.map(doc => doc.id);
        //console.log(animalsId);
        return animalsId;
    },
    async mudarDono(idListagem, novoDono) {
        console.log('Responsavel ID');
        console.log(idListagem);

        console.log('Usuario Logado');
        console.log(novoDono)

        const listagemCol = collection(db, 'listagem');
        const listagemAnimais = collection(db, 'animais');

        //const filtragem = query(collection(db, 'listagem'), where('Responsavel', '==', 'donoexemplo'));
        //const filtragem2 = query(collection(db, 'listagem'), where('ID', '==', '1'));

        const filtragemComposta = query(collection(db, 'listagem'), where('Responsavel', '==', 'donoexemplo'));
        const filtragemAnimais = query(collection(db, 'animais'), where('responsavelId', '==', idListagem));

        console.log(filtragemComposta);

        const querySnapshot = await getDocs(filtragemComposta);
        let id = null;
        querySnapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data());
            id = doc.id;
        });
        console.log('Listagem ID');
        console.log(id);

        const querySnapshotAnimais = await getDocs(filtragemAnimais);
        let id2 = null;

        querySnapshotAnimais.forEach((doc) => {
            //  console.log(doc.id, " => ", doc.data());
            id2 = doc.id;
        });
        //mudar o responsavel pela listagem do animal 

        console.log('AnimalID');
        console.log(id2);

        const docRef = doc(db, "listagem", id);
        const listagemRef = updateDoc(docRef, { Responsavel: "novoDono" });

        const docRef2 = doc(db, "animais", id2);
        const listagemRef2 = updateDoc(docRef2, { responsavelId: "novoDonoAnimal" });

        console.log(docRef)
        console.log(docRef2);

        return docRef2;
    }
}

export default animalService;
