import { StyleSheet, Text, View, Pressable, Image, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { auth } from '../../config/firebase/firebase';
import { currentUser } from '../../config/firebase/autenticacao';
import ChatComponent from './Chat';

export default function PageChat({ route }) {
    const { interessado } = route.params;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <ChatComponent idInteressado={interessado.id} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});