import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignIn from '../components/SignIn';
import CadastroPessoal from '../components/Register/CadastroPessoal';
import Home from '../components/Home';
import TelaErroAutorizacao from '../components/Error/TelaErroAutorizacao';
import CadastroAnimal from '../components/Register/CadastroAnimal';
import Introducao from '../components/Introducao/Introducao';
import MeusPets from '../components/MeusPets';
import DetalheAnimal from '../components/DetalheAnimal';
import Interessados from '../components/Interessados';
import ListaPets from '../components/ListaAdocao';
import { IconButton } from 'react-native-paper';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export function RoutesNotLogged() {

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="SignIn" component={SignIn} options={{ title: 'Login', headerStyle: { backgroundColor: '#cfe9e5' } }} />
                    <Drawer.Screen name="Cadastro Pessoal" component={CadastroPessoal} options={{ title: 'Cadastro Pessoal', headerStyle: { backgroundColor: '#cfe9e5' } }} />
                    <Drawer.Screen name="Home" component={Home} options={{ title: 'Home', headerStyle: { backgroundColor: '#cfe9e5' } }}/>
                    <Drawer.Screen name='Tela Erro Autorizacao' component={TelaErroAutorizacao}/>
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export function RoutesLogged() {

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name='Introducao' component={Introducao} options={{ title: 'Introducao', headerStyle: { backgroundColor: '#fff' } }} />
                    <Drawer.Screen name="Detalhe Animal" component={DetalheAnimal} options={{
                        title: 'Detalhe Animal', headerStyle: { backgroundColor: '#cfe9e5' } }} />
                    <Drawer.Screen name="Cadastro Animal" component={CadastroAnimal} options={{ title: 'Cadastro Animal', headerStyle: { backgroundColor: '#cfe9e5' } }} />
                    <Drawer.Screen name='Tela Erro Autorizacao' component={TelaErroAutorizacao}/>
                    <Drawer.Screen name="Interessados" component={Interessados} options={{ title: 'Interessados', headerStyle: { backgroundColor: '#cfe9e5' } }} />
                    <Drawer.Screen name='Meus Pets' component={MeusPets} options={{ title: 'Meus Pets', headerStyle: { backgroundColor: '#88c9bf' } }} />
                    <Drawer.Screen name='Lista Pets' component={ListaPets} options={{ title: 'Lista Pets', headerStyle: { backgroundColor: '#88c9bf' } }} />
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

/* export default function RoutesStack(){

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Detalhe Animal' component={DetalheAnimal} options={{
                        title: 'Detalhe Animal', headerStyle: { backgroundColor: '#cfe9e5' } }} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
} */