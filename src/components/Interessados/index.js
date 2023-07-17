import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
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
        //usuarioService.buscaInteressados(animalId).then((res) => setInteressados(res));
        usuarioService.buscaInteressados("Gsj8AEBwB4PgGD8H7iCT").then((res) => setInteressados(res));
    }, []);

    return (
        <ScrollView>
            { interessados?.map((interessado, index) => (
                <Card key={index} style={{ margin: 16 }}>
                    <Card.Title style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#cfe9e5' }} title={
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: '#434343'}}>{interessado.nome}</Text>
                        </View>
                    }/>
                    <Card.Content>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: '#434343'}}>E-mail: {interessado.email}</Text>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: '#434343'}}>Endereço: {interessado.endereco}</Text>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: '#434343'}}>Telefone: {interessado.telefone}</Text>

                        <Pressable onPress={() => alert('Click chat.')}>
                            <Text style={styles.buttonLabel}>CHAT</Text>
                        </Pressable>
                        <Pressable onPress={() => alert('Click aceitar.')}>
                            <Text style={styles.buttonLabel}>ACEITAR</Text>
                        </Pressable>
                        <Pressable onPress={() => alert('Click recusar.')}>
                            <Text style={styles.buttonLabel}>RECUSAR</Text>
                        </Pressable>
                    </Card.Content>
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