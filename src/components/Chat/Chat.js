import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getDocs, getDoc, getFirestore, doc, where, query, orderBy } from 'firebase/firestore';
import { currentUser } from '../../config/firebase/autenticacao';

const firebaseConfig = {
  apiKey: "AIzaSyAqb-fVEhDyWPEJdMmFq-fCmQ6LuxpG994",
  authDomain: "miau-database.firebaseapp.com",
  projectId: "miau-database",
  storageBucket: "miau-database.appspot.com",
  messagingSenderId: "241980715406",
  appId: "1:241980715406:web:a771069d73e8188235b4df",
  measurementId: "G-KBTQK3YJWL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Para alinhar as mensagens no topo
    marginBottom: 8,
  },
  userMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    justifyContent: 'flex-end', // Para alinhar as mensagens do usuário à direita
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0080ff', // Azul para o nome do usuário
    marginRight: 5,
  },
  normalText: {
    fontSize: 16,
    color: '#434343', // Cor padrão para o texto das mensagens
  },
  userNormalText: {
    fontSize: 16,
    color: '#ffffff', // Cor branca para o texto das mensagens do usuário
  },
  chatInput: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
  },
  chatButton: {
    padding: 8,
    backgroundColor: '#ffd358',
    alignItems: 'center',
    borderRadius: 5,
    width: 80,
    alignSelf: 'flex-end', // Alinha o botão à direita
  },
  chatButtonText: {
    color: '#434343',
    fontWeight: 'bold',
  },
};

const fetchMessages = async (idInteressado, idDono) => {
  const chatColRef = collection(db, "chat");
  const q = query(
    chatColRef,
    where('idInteressado', '==', idInteressado),
    where('idDono', '==', idDono),
    orderBy('timestamp')
  );
  const querySnapshot = await getDocs(q);
  const messageList = querySnapshot.docs.map(doc => doc.data());
  return messageList;
};

// Função que busca o campo 'responsavelId' no documento com o ID especificado na coleção 'animais'
const getResponsavelId = async (animalId) => {
  try {
    // Obtém a referência para o documento na coleção 'animais' com o ID especificado
    const animalRef = doc(db, 'animais', animalId);
    
    // Obtém os dados do documento
    const docSnap = await getDoc(animalRef);
    
    // Verifica se o documento existe
    if (docSnap.exists()) {
      // Retorna o valor do campo 'responsavelId'
      return docSnap.data().responsavelId;
    } else {
      // Caso o documento não exista, retorna null ou algum valor padrão, de acordo com a sua necessidade
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar o campo responsavelId:', error);
    return null;
  }
};

// Exemplo de uso da função
const animalId = 'Gsj8AEBwB4PgGD8H7iCT'; // Substitua pelo ID do documento que deseja procurar
  getResponsavelId(animalId)
    .then((responsavelId) => {
      if (responsavelId) {
        console.log('Responsável ID:', responsavelId);
      } else {
        console.log('Documento não encontrado ou campo responsavelId não definido.');
      }
    })
    .catch((error) => {
      console.error('Erro ao obter o responsavelId:', error);
    });


const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Supondo que você tenha idInteressado e idDono como valores a serem filtrados
    const idInteressado = currentUser().uid; // substitua pelo valor real
    const animalId = 'Gsj8AEBwB4PgGD8H7iCT';

    const fetchResponsavelIdAndSendMessage = async () => {
      try {
        const responsavelId = await getResponsavelId(animalId);
        if (responsavelId) {
          console.log('Responsável ID:', responsavelId);
          
        } else {
          console.log('Documento não encontrado ou campo responsavelId não definido.');
        }
  
        const messageList = await fetchMessages(currentUser().uid, responsavelId);
        setMessages(messageList);
      } catch (error) {
        console.error('Erro ao obter o responsavelId:', error);
      }
    };


    fetchResponsavelIdAndSendMessage();
    
  }, []);

  const handleInputChange = text => {
    setUserName(currentUser().email);
    setNewMessage(text);
  };

  const handleUserNameChange = text => {
    
  };

  const handleSendPress = async () => {
    const animalId = 'Gsj8AEBwB4PgGD8H7iCT'; // Substitua pelo ID do documento que deseja procurar

    try {
      const responsavelId = await getResponsavelId(animalId);
      if (responsavelId) {
        sendMessage(currentUser().uid, responsavelId);
      } else {
        console.log('Documento não encontrado ou campo responsavelId não definido.');
      }
    } catch (error) {
      console.error('Erro ao obter o responsavelId:', error);
    }
  };

  const sendMessage = async (idInteressado, idDono) => {
    const message = {
      text: newMessage,
      name: userName,
      idInteressado,
      idDono,
      timestamp: Date.now()
    };
    await addDoc(collection(db, "chat"), message);
    setNewMessage('');
    setUserName('');


      
    const updatedMessageList = await fetchMessages(idInteressado, idDono);
    setMessages(updatedMessageList);

    
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.boldText}>{item.name}:</Text>
            <Text style={styles.normalText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.chatInput}
        placeholder="Nova Mensagem"
        value={newMessage}
        onChangeText={handleInputChange}
      />
       <Pressable style={styles.chatButton} onPress={handleSendPress}>
      <Text style={styles.chatButtonText}>Enviar</Text>
        </Pressable>
    </View>
  );
};

export default Chat;
