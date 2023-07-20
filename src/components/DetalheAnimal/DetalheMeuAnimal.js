import { useState, useEffect } from 'react';
import { View, Image, ScrollView } from 'react-native';
import animalService from '../../services/animalService';
import { Button, Text, IconButton, Divider } from 'react-native-paper';
import CampoInfo from './CampoInfo';
import { StyleSheet } from 'react-native';
import { db, dbUse } from '../../config/firebase/firebase';
import { collection, addDoc, query, and, where,getDocs , doc , updateDoc, getFirestore, deleteDoc } from "firebase/firestore";
import { currentUser } from '../../config/firebase/autenticacao';

export default function DetalheMeuAnimal({ route, navigation }) {

    const { animal, animalId } = route.params;
   
    useEffect(() => {
        navigation.setOptions({ 
            title: animal.nome, 
            headerRight: () => <IconButton icon="share-variant" color="#434343" size={30} onPress={() => console.log('Pressed')} />,
            headerLeft: () => <IconButton icon="arrow-left" color="#434343" size={30} onPress={() => navigation.navigate("Meus Pets")} /> });
        // see the stack of screens
        /* navigation.dispatch(state => {
            // print the stack state
            console.log(state);
            return state;
        }); */
    }, []);
    return (
        <ScrollView>
            <Image source={{ uri: animal.foto }} style={{ width: "100%", height: 200 }} />
            <IconButton
                icon="pencil"
                color="#434343"
                size={40}
                onPress={() => console.log('Pressed')}
                style={{ position: 'absolute', top: 167, left: '80%', backgroundColor: '#fff', borderRadius: 50, boxShadow: '0px 0px 5px #434343' }}
            />
            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 25, color: '#434343'}}>{animal.nome}</Text>
                <View style={styles.campo}>
                    <CampoInfo label="Sexo" value={animal.sexo} />
                    <CampoInfo label="Porte" value={animal.porte} />
                    <CampoInfo label="Idade" value={animal.idade} />
                </View>
                <View style={{ marginBottom: 16, marginTop: 5 }} >
                    <CampoInfo label="Localização" value={"Nao definida"} />
                </View>
                <Divider />
                <View style={styles.campo}>
                    <CampoInfo label="Castrado" value={animal.saude?.includes("castrado") ? "Sim" : "Não"} />
                    <CampoInfo label="Vacinado" value={animal.saude?.includes("vacinado") ? "Sim" : "Não"} />
                </View>
                <View style={styles.campo}>
                    <CampoInfo label="Vermifugado" value={animal.saude?.includes("vermifugado") ? "Sim" : "Não"} />
                    <CampoInfo label="Doenças" value={animal.doencas} />
                </View>
                <Divider />
                <View style={{ marginBottom: 16, marginTop: 5 }} >
                    <CampoInfo label="Temperamento" value={animal.temperamento.join(", ")} />
                </View>
                <Divider />
                <View style={{ marginBottom: 16, marginTop: 5 }} >
                    <CampoInfo label="Exigências" value={animal.exigencias.join(", ")} />
                </View>
                <Divider />
                <View style={{ marginBottom: 16, marginTop: 5 }} >
                    <CampoInfo label={"Mais sobre " + animal.nome} value={animal.historia} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                    <Button mode='contained' buttonColor='#88c9bf' textColor='#757575' onPress={() => navigation.navigate('Interessados' , {animalId: animalId, responsavelId: animal.responsavelId})}>VER INTERESSADOS</Button>
                    <Button mode='contained' buttonColor='#88c9bf' textColor='#757575' onPress={() => removerAnimal(animal.responsavelId)}>REMOVER PET</Button>
                </View>
            </View>
        </ScrollView>
    );
}

async function mudarDono(idListagem, novoDono) {
    console.log('Responsavel ID');
    console.log(idListagem);


    console.log('Usuario Logado');
    console.log(novoDono)
    
    const listagemCol = collection(db, 'listagem');
    const listagemAnimais = collection(db, 'animais');
  
    //const filtragem = query(collection(db, 'listagem'), where('Responsavel', '==', 'donoexemplo'));
    //const filtragem2 = query(collection(db, 'listagem'), where('ID', '==', '1'));
    
    
    const filtragemComposta = query(collection(db, 'listagem'),  where('Responsavel', '==', 'donoexemplo'));
    const filtragemAnimais = query(collection(db, 'animais'),  where('responsavelId', '==', idListagem));
    
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
    const listagemRef = updateDoc(docRef, {Responsavel: "novoDono"});
    
    
    const docRef2 = doc(db, "animais", id2);
    const listagemRef2 = updateDoc(docRef2, {responsavelId: "novoDonoAnimal"});
    
    console.log(docRef)
    console.log(docRef2);

    
    return docRef2;
   
    
  
    
}

async function removerDono(idListagem) {
    console.log('Responsavel ID');
    console.log(idListagem);
    
    const listagemCol = collection(db, 'listagem');
    
    
    const filtragemComposta = query(collection(db, 'listagem'),  where('responsavelId', '==', idListagem));
    
    console.log(filtragemComposta);

    const querySnapshot = await getDocs(filtragemComposta);
    let id = null;
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        id = doc.id;
    });

    console.log(id);

    const docRef = doc(db, "animais", id);
    const listagemRef = deleteDoc(docRef);
    
    console.log(docRef)

    return docRef2;  
}

async function removerAnimal(idListagem) {
    console.log('Responsavel ID');
    console.log(idListagem);
    
    const listagemCol = collection(db, 'animais');
    
    
    const filtragemComposta = query(collection(db, 'animais'),  where('Responsavel', '==', 'donoexemplo2'));
    
    console.log(filtragemComposta);

    const querySnapshot = await getDocs(filtragemComposta);
    let id = null;
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        id = doc.id;
    });

    console.log(id);



    const docRef = doc(db, "listagem", id);
    const listagemRef = deleteDoc(docRef);

    
    console.log(docRef)


    
    return docRef2;
   
    
  
    
}


const styles = StyleSheet.create({
    campo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginTop: 5
    }
});