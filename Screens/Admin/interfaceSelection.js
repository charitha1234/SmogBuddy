import React,{useState,useEffect} from "react"; 
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import RadioButton from '../../Components/radioButton';
function InterfaceSelection({ navigation }) {
    const [driver,setDriver]=useState(false);
    const [technician,setTechnician]=useState(false);
    const [manager,setManager]=useState(false);
    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
            <View style={styles.upperContainer}>
                <Text style={styles.waterMarkText}>SMOGBUDDY</Text>
                <Text style={styles.largeText}>SELECT ACCOUNT TYPE</Text>
            </View>
            <View style={styles.selection}>
                <View style={styles.insideArea}>
                    <View style={styles.sections}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.smallText}>Driver</Text>
                            <TouchableOpacity onPress={()=>{
                                setDriver(true)
                                setManager(false)
                                setTechnician(false)
                                navigation.navigate("EmployeeRegistration_1",{role:"DRIVER"})
                            }}>
                                <RadioButton selected={driver} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.sections}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.smallText}>Technician</Text>
                            <TouchableOpacity onPress={()=>{
                                setDriver(false)
                                setManager(false)
                                setTechnician(true)
                                navigation.navigate("EmployeeRegistration_1",{role:"TECHNICIAN"})
                            }}>
                                <RadioButton selected={technician} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.sections}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.smallText}>Manager</Text>
                            <TouchableOpacity onPress={()=>{
                                setDriver(false)
                                setManager(true)
                                setTechnician(false)
                                navigation.navigate("EmployeeRegistration_1",{role:"ADMIN"})
                            }}>
                                <RadioButton selected={manager} />
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
        height: 300,
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
        marginTop: 70,
        marginBottom: -100,
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        letterSpacing: 4,
        textAlign:'center',
        alignSelf:'center',
        color: color.primaryBlack,
    },
    waterMarkText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        margin: 20,
        letterSpacing: 6,
        marginLeft: 30,
        color: color.primaryBlack,

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
        width:'100%'
    }
});