import { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import animalService from '../../services/animalService';
import { Card, Text, IconButton } from 'react-native-paper';
import { currentUser } from '../../config/firebase/autenticacao';

export default function MeusPets({ navigation }) {

    const [animais, setAnimais] = useState([]);
    const [animaisId, setAnimaisId] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="magnify" color="#434343" size={30} onPress={() => console.log('Pressed')} />
        });
        animalService.getMyAnimals(currentUser().uid).then((res) => setAnimais(res));
        console.log(animais);

        animalService.getIdAnimal().then((res) => setAnimaisId(res));
        console.log(animaisId);
    }, []);

    return (
        <ScrollView>
            {animais?.map((animal, index) => (
                <Card key={index} style={{ margin: 16 }}>
                    <Card.Title style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#cfe9e5' }} title={
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: '#434343'}}>{animal.nome}</Text>
                            <IconButton style={{margin: 0}} icon="information" size={25} onPress={() => navigation.navigate('Detalhe Animal', { animal: animal })} />
                        </View>
                    }/>
                    <Card.Cover source={{ uri: animal.foto }} />
                    <Card.Content>
                        <Text style={{fontSize: 18, textAlign: 'center', marginTop: 7}} name="aqui" > X NOVOS INTERASSADOSS</Text>
                        <IconButton style={{margin: 0}} icon="information" size={25} onPress={() => navigation.navigate('Interessados', { animalId: animaisId[index] })} />
                    </Card.Content>
                </Card>
            ))}
        </ScrollView>
    );
}
/*
async function buscaInteressados(idAnimal) {
    const listaInteressados = query(collection(db, 'adocao'),  where("ID", "==", idAnimal));
    const querySnapshot = await getDocs(listaInteressados);
    const interessados = querySnapshot.docs.map(doc => doc.data());
    console.log("Lista de pessoas interessadas:", interessados);

    return "0";
}
*/