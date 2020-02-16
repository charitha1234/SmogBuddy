import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../Assets/color';
import Logo from '../Assets/logo';
import GradientButton from '../Components/gradientButton';
import TextBox from '../Components/textboxLogin';
function Login({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.primaryBlue]} style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.watermarkText}>SMOGBUDDY</Text>
                    <Logo style={styles.Logo} />
                </View>
                    <View style={styles.LoginForm}>
                        <View style={{flex:1 ,marginTop:30,marginBottom:-30}}><TextBox title="USERNAME" icon="md-person"/></View>
                        <View style={styles.middleLine}/>
                        <View  style={{flex:1}}><TextBox title="PASSWORD" icon="md-key"/></View>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={()=>{navigation.navigate('MenuScreens')}}>
                                <GradientButton />
                            </TouchableOpacity>
                        </View>
                </View>
                <View style={{ flex: 0.4 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('NewUser') }} style={{ position: 'absolute', bottom: "5%" }}><Text style={styles.bottomText}>NEW ACCOUNT</Text></TouchableOpacity>
                </View>
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
        flex: 1,
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
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 10,

    },
    LoginForm: {
        flex:0.6,
        alignSelf: 'center',
        alignItems: 'stretch',
        justifyContent:'space-between',
        backgroundColor: 'white',
        width: 300,
        height: 150,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 8,

    },
    middleLine:{
        flex:1,
        borderBottomColor: 'black',
         borderBottomWidth: 0.5, 
         marginHorizontal:20,
         marginVertical:20,
         opacity:0.5 
        }
});