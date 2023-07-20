import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Image } from 'react-native';
import usuarioService from '../../services/usuarioService';
import animalService from '../../services/animalService';
import { Card, Text, IconButton, Button } from 'react-native-paper';
import { currentUser } from '../../config/firebase/autenticacao';
//import { cos } from 'react-native-reanimated';

export default function Interessados({ route, navigation }) {

    const [loading, setLoading] = useState(false);
    const [interessados, setInteressados] = useState([]);
    const { animalId, responsavelId } = route.params;
    console.log(animalId);
    

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="magnify" color="#434343" size={30} onPress={() => console.log('Pressed')} />
        });
        //usuarioService.buscaInteressados(animalId).then((res) => setInteressados(res));
        usuarioService.buscaInteressados(animalId).then((res) => setInteressados(res));
    }, []);

    const handlerAdocao = async (donoAtualId, novoDonoId) => {
        animalService.mudarDono(donoAtualId, novoDonoId)
            .then(() => {
                console.log('Mudou o dono');
                navigation.navigate('Meus Pets');
            })
            .catch((error) => {
                console.log('Erro ao mudar o dono');
                console.log(error);
            });
    }

    return (
        <ScrollView>
            { interessados?.map((interessado, index) => (
                <Card key={index} style={{ margin: 16 }}>
                    <Card.Title style={{ flexDirection: 'column', justifyContent: 'center'}} title={
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: '#434343'}}>{interessado.nome}</Text>
                        </View>
                    }/>
                    <Card.Content>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Image source={{ uri: interessado.foto }} style={{ width: 70, height: 70, borderRadius: 50 }} />
                        </View>

                        <Text style={{ fontSize: 18, fontWeight: '500', color: '#434343'}}>E-mail: {interessado.email}</Text>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: '#434343'}}>Endereço: {interessado.endereco}</Text>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: '#434343'}}>Telefone: {interessado.telefone}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => handlerAdocao(responsavelId, interessado.id)}>Adotar</Button>
                        <Button onPress={() => alert('Click Recusar')}>Recusar</Button>
                    </Card.Actions>
                </Card>
            )) }
        </ScrollView>
    );
}


const styles = StyleSheet.create({
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
    buttonLabel: {
        color: '#434343',
        fontSize: 12,
      },
  });

async function mudarDono(idListagem, novoDono) {
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