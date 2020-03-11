import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, ScrollView, KeyboardAvoidingView
} from "react-native";
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextBox from '../../Components/textBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GradientButton from '../../Components/longButton';
function UserRegistration({ navigation }) {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("")
    const [address, setaddress] = useState("");
    const [state, setstate] = useState("");

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.primaryBlue]} style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1, zIndex: 0 }} contentContainerStyle={{height:550,justifyContent:'space-between'}}>
                <View style={styles.upperContainer}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backButton}>
                    <Ionicons  name="ios-arrow-dropleft-circle" size={40} color={color.primaryWhite}/>
                    </TouchableOpacity>
                    <Text style={styles.waterMarkText}>SMOGBUDDY </Text>
                    <Text style={styles.smallText}>|</Text>
                    <Text style={styles.smallText}> CUSTOMER</Text>
                </View>
                <View style={styles.selection}>
                    <View style={styles.insideArea}>
                        <TextBox title="First NAME" underline={true}  onChangeText={text => setfirstName(text)} />
                        <TextBox title="Last NAME" underline={true}  onChangeText={text => setlastName(text)} />
                        <TextBox title="ADDRESS" underline={true} onChangeText={text => setaddress(text)} />
                        <TextBox title="STATE" underline={true} onChangeText={text => setstate(text)} />

                    </View>
                    <View style={{ flexDirection: 'row', zIndex: 1, marginHorizontal:20, justifyContent: 'space-between'}}>
                        <Text style={styles.subText}>1/2</Text>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                            if(firstName==""||lastName==""||address==""||state=="")alert("Please Fill All Requires")
                            else navigation.navigate("UserRegistration_2",{firstName:firstName,lastName:lastName,address:address,state:state}) 
                            }}><GradientButton style={styles.button} /></TouchableOpacity>
                    </View>
                </View>
                <View />
            </KeyboardAwareScrollView>
        </LinearGradient>

    );

}

export default UserRegistration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    selection: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: 300,
        height: 400,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 8,
        zIndex: 0

    }
    ,
    smallText: {
        fontFamily: 'Montserrat-regular',
        fontSize: 10,
        letterSpacing: 6,
        color: color.primaryWhite,
    },
    subText: {
        fontFamily: 'Montserrat-regular',
        fontSize: 12,
        letterSpacing: 4,
        color: color.primaryBlack,
        marginLeft: 20,
        opacity: 0.5
    },
    waterMarkText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        letterSpacing: 6,
        color: color.primaryWhite,

    },
    insideArea: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        margin:20,
        zIndex: 0
    },
    upperContainer: {
        height: 50,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems:'center',
        marginVertical: 20,
        justifyContent:'space-evenly'
    },
    button: {

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 10,


    },
    buttonContainer: {
        marginRight: -30,
        marginBottom:-10,
        zIndex: 1
    },
    backButton:{
        marginHorizontal:20,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 5,

    },
    icon:{
        color:'#ac47ff',
        zIndex:0,
    },
    icon1:{
        color:color.buttonLower,
        marginRight:-45,
        marginTop:-20,
        zIndex:1,
    }

});