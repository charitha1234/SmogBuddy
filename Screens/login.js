import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../Assets/color';
import Logo from '../Assets/logo';
import GradientButton from '../Components/gradientButton';
import TextBox from '../Components/textBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
function Login({ navigation }) {

    return (
        <SafeAreaView style={{flex:1}}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.primaryBlue]} style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.watermarkText}>SMOGBUDDY</Text>
                    <Logo style={styles.Logo} />
                </View>
                <View style={styles.LoginForm}>
                    <TextBox title="USERNAME" />
                    <TextBox title="PASSWORD" />
                    <View style={styles.button}>
                        <TouchableOpacity >
                            <GradientButton />
                        </TouchableOpacity>
                    </View>
                   
                </View>
                <TouchableOpacity  onPress={() => { navigation.navigate('NewUser') }} style={{ position: 'absolute', bottom: "5%" }}><Text style={styles.bottomText}>NEW ACCOUNT</Text></TouchableOpacity>
        </LinearGradient>
        </SafeAreaView>


    );

}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: "center",
    },
    Logo: {
        alignSelf: 'center',
    },
    bottomText: {
        flex:1,
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        letterSpacing: 6,
        color: color.primaryWhite,
        margin: 20
    },
    watermarkText: {
        flex: 1,
        alignSelf: 'flex-start',
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        margin: 20,
        letterSpacing: 6,
        marginLeft: 30,
        color: color.primaryWhite,

    },
    button: {
        alignSelf: 'flex-end',
        marginBottom: -20,
        marginRight: -20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 8.30,

        elevation: 10,


    },
    LoginForm: {
        flex:1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'white',
        width: '70%',
        height: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 8.30,
        elevation: 8,
        margin:100,

    },
});