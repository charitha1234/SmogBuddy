import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../Assets/color';
import Logo from '../Assets/logo';
import GradientButton from '../Components/gradientButton';
import TextBox from '../Components/textBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
function Login({ navigation }) {

    return (
        
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.primaryBlue]} style={styles.container}>
               
                <View style={{ flex: 1}}>
                    <Text style={styles.watermarkText}>SMOGBUDDY</Text>
                    <Logo style={styles.Logo}/>
                </View>
                <View style={styles.SigninArea}>
                    <View style={styles.LoginForm}>
                        <TextBox title="USERNAME"/>
                        <TextBox title="PASSWORD"/>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity >
                        <GradientButton/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={()=>{navigation.navigate('NewUser')}} style={{position:'absolute',bottom:"5%"}}><Text style={styles.bottomText}>NEW ACCOUNT</Text></TouchableOpacity>
                </View>
            </LinearGradient>
        
    );

}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: "center",
    },
    Logo:{
        alignSelf:'center',
    },
    bottomText:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        letterSpacing:6,
        color: color.primaryWhite,
        margin:20
    },
    watermarkText: {
        flex: 1,
        alignSelf:'flex-start',
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        margin:20,
        letterSpacing:6,
        marginLeft:30,
        color: color.primaryWhite,

    },
    button: {
        position:'absolute',
        bottom:'25%',
        right:'0%',
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
        position:'absolute',
        top:'5%',
        backgroundColor: 'white',
        alignSelf:'center',
        width: '80%',
        height: '60%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 8.30,

        elevation: 8,
    
    },
    SigninArea: {
        flex: 1,
        alignSelf:'center',
        justifyContent: 'center',
        alignItems:'stretch',
        backgroundColor: 'transparent',
        width: '90%',
        height: '40%',
    }
});