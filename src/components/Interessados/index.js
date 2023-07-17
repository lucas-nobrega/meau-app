import { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import usuarioService from '../../services/usuarioService';
import { Card, Text, IconButton } from 'react-native-paper';
import { currentUser } from '../../config/firebase/autenticacao';

export default function Interessados({ route, navigation }) {

    const [loading, setLoading] = useState(false);
    const [interessados, setInteressados] = useState([]);
    //const { animalId } = route.params;

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="magnify" color="#434343" size={30} onPress={() => console.log('Pressed')} />
        });
        //usuarioService.buscaInteressados(animalId);
        usuarioService.buscaInteressados("Gsj8AEBwB4PgGD8H7iCT").then((res) => setInteressados(res));
    }, []);

    return (
        <ScrollView>
            <Text style={{fontSize: 18, textAlign: 'center', marginTop: 7}} name="aqui" > X NOVOS INTERASSADOSS</Text>
            { interessados?.map((interessado, index) => (
                <Card key={index} style={{ margin: 16 }}>
                    <Card.Title style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#cfe9e5' }} title={
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: '#434343'}}>{interessado.nome}</Text>
                        </View>
                    }/>
                </Card>
            )) }
        </ScrollView>
    );
}