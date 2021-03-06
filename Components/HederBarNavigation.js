import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../Assets/color';
function HeaderBar(props) {

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.lightBlue]} style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerBar}>
                   <View style={{flex:1}}/>
                    <Text style={styles.headerTitle}>{props.title}</Text>
                    <TouchableOpacity disabled={!props.navigationEnabled} onPress={props.onPressRightIcon} style={{flex:1,flexDirection:'row', justifyContent:'flex-end'}}>
                        <Ionicons style={{color:color.primaryWhite}} name="md-navigate" size={30}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );

}

export default HeaderBar;

const styles = StyleSheet.create({
    container: {
        height: 66,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 5,

    },
    headerBar: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    headerTitle: {
        flex:2,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 3,
        color: color.primaryWhite,
    }
});