import { ScrollView, Text, View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { RadioButton, Checkbox, Button } from 'react-native-paper';
import { Formik } from 'formik';
import { currentUser } from '../../config/firebase/autenticacao';

import animalService from '../../services/animalService';

export default function FinalizarAdocao({ navigation }) {

    const [refresh, setRefresh] = useState(false);

    const checkboxaAnimais = [
        { label: 'Brincalhão', value: 'Brincalhão' },
        { label: 'Calmo', value: 'Calmo' },
        { label: 'Tímido', value: 'Tímido' },
        { label: 'Guarda', value: 'Guarda' },
        { label: 'Amoroso', value: 'Amoroso' },
        { label: 'Preguiçoso', value: 'Preguiçoso' }
    ];

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Formik
                initialValues={{ especie: '', temperamento: [] }}
                onSubmit={values => {
                    values.foto = image;
                    values.paraAdocao = true;
                    values.responsavelId = currentUser().uid;
                    animalService.createAnimal(values).then((res) => {});
                }}
                
            >
                {({ handleSubmit, values }) => (
                    <View>
                        <View>
                            <Text style={styles.label}>SELECIONE O(S) ANIMAL(IS)</Text>
                            <View>
                                {checkboxaAnimais.map((item, index) => (
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }} key={index}>
                                        <Checkbox
                                            status={values.temperamento.indexOf(item.value) !== -1 ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                if (values.temperamento.indexOf(item.value) !== -1) {
                                                    values.temperamento.splice(values.temperamento.indexOf(item.value), 1);
                                                }
                                                else {
                                                    values.temperamento.push(item.value);
                                                }
                                                setRefresh(!refresh);
                                            }}
                                        />
                                        <Text>{item.label}</Text>
                                    </View>
                                ))
                                }
                            </View>
                        </View>
                        <View>
                            <Text style={styles.label}>SELECIONE O USUÁRIO</Text>
                            <RadioButton.Group onValueChange={(especie) => {values.especie = especie; setRefresh(!refresh);}} value={values.especie}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton value="cachorro" />
                                    <Text>Cachorro</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton value="gato" />
                                    <Text>Gato</Text>
                                </View>
                            </RadioButton.Group>
                        </View>
                        <Button mode="contained" onPress={handleSubmit}>FINALIZAR PROCESSO</Button>
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    imagePicker: {
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 16,
        marginBottom: 16,
        width: 180,
        height: 180,
    },
    contentContainer: {
        paddingVertical: 20
    }
});