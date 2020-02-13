import React,{useState,useEffect} from "react"; 
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { color } from '../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import RadioButton from '../Components/radioButton';
function InterfaceSelection({ navigation }) {
    const [driver,setDriver]=useState(false);
    const [user,setUser]=useState(false);

    useEffect(()=>{
       driver? navigation.navigate("DriverRegistration") :null;
       user? navigation.navigate("UserRegistration"):null;
    });
    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.primaryBlue]} style={styles.container}>
            <View style={styles.upperContainer}>
                <Text style={styles.waterMarkText}>SMOGBUDDY</Text>
                <Text style={styles.largeText}>NEW ACCOUNT</Text>
            </View>
            <View style={styles.selection}>
                <View style={styles.insideArea}>
                    <View style={styles.sections}>
                        <Text style={styles.smallText}>WHO AM I?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.smallText}>Customer(Vehicle Owner)</Text>
                            <TouchableOpacity onPress={()=>{driver? setDriver(false) & setUser(true) : setUser(true) }}>
                                <RadioButton selected={user} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.sections}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.smallText}>Driver</Text>
                            <TouchableOpacity onPress={()=>{user? setDriver(true) & setUser(false) : setDriver(true)}}>
                                <RadioButton selected={driver} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View />
        </LinearGradient>
    );

}

export default InterfaceSelection;

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
        height: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 8,

    }
    ,
    smallText: {
        fontFamily: 'Montserrat-regular',
        fontSize: 15,
        letterSpacing: 2,
        opacity: 0.5
    },
    largeText: {
        marginLeft: 30,
        marginTop: 70,
        marginBottom: -100,
        fontFamily: 'Montserrat-Bold',
        fontSize: 25,
        letterSpacing: 4,
        color: color.primaryBlack,
    },
    waterMarkText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        margin: 20,
        letterSpacing: 6,
        marginLeft: 30,
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
        alignSelf: 'flex-start',
    }
});