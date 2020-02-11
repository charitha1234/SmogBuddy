import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

function RegistrationScreen1({ navigation }){

return(
    <View style={styles.container}>
        <Text>RegistrationScreen1</Text>
        <Button title="Go to Register Screen 2" onPress={() => navigation.navigate('RegisterScreen2')}/>
    </View>
    );

}

export default RegistrationScreen1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});