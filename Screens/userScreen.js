import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

function User({navigation},props){

return(
    <View style={styles.container}>
        <Text>User</Text>
    </View>
    );

}

export default User;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});