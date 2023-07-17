import { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import animalService from '../../services/animalService';
import { Card, Text, IconButton } from 'react-native-paper';
import { currentUser } from '../../config/firebase/autenticacao';

export default function ListaPets({ navigation }) {

    const [animais, setAnimais] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="magnify" color="#434343" size={30} onPress={() => console.log('Pressed')} />
        });
        animalService.getAnimalsAdoption(currentUser().uid).then((res) => setAnimais(res));
        console.log(animais);
    }, []);
    //const containerStyle = { backgroundColor: 'white', padding: 20 };

    return (
        <ScrollView>
            <View>
                {animais?.map((animal, index) => {
                    if(currentUser().uid != animal.responsavelId)
                        return <Card key={index} style={{ margin: 16 }}>
                            <Card.Title style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#cfe9e5' }} title={
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <Text style={{ fontSize: 18, fontWeight: '500', color: '#434343'}}>{animal.nome}</Text>
                                    <IconButton style={{margin: 0}} icon="information" size={25} onPress={() => navigation.navigate('Detalhe Animal', { animal: animal })} />
                                </View>
                            }/>
                            <Card.Cover source={{ uri: animal.foto }} />
                            <Card.Content>
                                <Text style={{fontSize: 18, textAlign: 'center', marginTop: 7}} >X NOVOS INTERASSADOS</Text>
                                {/* Funcao no service para contar a quantidade de interesados no animal */}
                            </Card.Content>
                        </Card>
                })}
            </View>
        </ScrollView>
    );
}