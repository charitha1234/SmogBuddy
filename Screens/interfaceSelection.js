import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

function InterfaceSelection({ navigation }){

return(
    <View style={styles.container}>
        <Text>InterfaceSelection</Text>
        <Button title="Go to Register Screen 1" onPress={() => navigation.navigate('RegisterScreen1')}/>
    </View>
    );

}

export default InterfaceSelection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});