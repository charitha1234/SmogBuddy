import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, ScrollView
} from "react-native";
import { color } from '../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../Components/textBox';
import GradientButton from '../Components/longButton';
function UserRegistration({ navigation }) {

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.primaryBlue]} style={styles.container}>

            <View style={styles.upperContainer}>
                <Text style={styles.waterMarkText}>SMOGBUDDY </Text>
                <Text style={styles.smallText}>|</Text>
                <Text style={styles.smallText}> CUSTOMER</Text>
            </View>
            <View style={styles.selection}>
                <View style={styles.insideArea}>
                    <TextBox title="NAME" underline={true} icon="md-contact" icon2="md-add-circle" size={50}/>
                    <TextBox title="ADDRESS" underline={true} />
                    <TextBox title="STATE" underline={true} />
                    <TextBox title="ZIP CODE" underline={true} />
                    <TextBox title="PHONE NO" underline={true} />
                    <TextBox title="EMAIL" underline={true} />
                    <TextBox title="PASSWORD" underline={true} />

                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between' ,marginBottom: -20,marginRight: -20}}>
                    <Text style={styles.subText}>1/2</Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Home")}}><GradientButton style={styles.button} /></TouchableOpacity>
                </View>
            </View>
            <View />

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
        height: 500,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 8,
        marginTop: -60

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
        marginLeft: 40,
        opacity: 0.5
    },
    waterMarkText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        letterSpacing: 6,
        color: color.primaryWhite,

    },
    sections: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    insideArea: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        margin: 20,
    },
    upperContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        margin: 20,
        marginHorizontal: 30,
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
});