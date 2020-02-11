import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
} from "react-native";

function Login({ navigation }){

return(
    <View style={styles.container}>
        <Text>Login Screen</Text>
        <Button title="Login" onPress={() => navigation.navigate('NewUser')}/>
    </View>
    );

}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});