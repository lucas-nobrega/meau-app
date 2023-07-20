import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

export default function CampoInfo(props) {
    return (
        <View style={{ flexDirection: 'column' }}>
            <Text style={styles.label} >{props.label.toUpperCase()}</Text>
            <Text style={styles.value}>{props.value ? props.value : "Não definido"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        color: '#589b9b'
    },
    value: {
        fontSize: 20,
        color: '#757575'
    }
});