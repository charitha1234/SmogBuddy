import React,{useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, ScrollView
} from "react-native";
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../../Components/textBox';
import GradientButton from '../../Components/longButton';
import firebase from 'react-native-firebase';
function newUser(username,password,firstName,address,state,zipCode,phoneNo,navigation){
    firebase.auth().createUserWithEmailAndPassword(username,password)
    .then((res)=>{
        fetch('https://smogbuddy-dev.herokuapp.com/user/' ,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: res.user.uid,
          firstName:firstName,
          lastName:"",
          address:address,
          state:state,
          zipCode:zipCode,
          phoneNumber:phoneNo,
          email:username,
          role:"USER"
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        navigation.navigate("Notification");
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
})
    .catch((e)=>alert(e))

}
function UserRegistration({ navigation }) {
const [username, setusername] = useState("");
const [password, setpassword] = useState("");
const [firstName, setfirstName] = useState("");
const [address, setaddress] = useState("");
const [state, setstate] = useState("");
const [zipcode, setzipcode] = useState("");
const [phoneNo, setphoneNo] = useState("");

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.primaryBlue]} style={styles.container}>

            <View style={styles.upperContainer}>
                <Text style={styles.waterMarkText}>SMOGBUDDY </Text>
                <Text style={styles.smallText}>|</Text>
                <Text style={styles.smallText}> CUSTOMER</Text>
            </View>
            <View style={styles.selection}>
                <View style={styles.insideArea}>
                    <TextBox title="NAME" underline={true} icon="md-contact" icon2="md-add-circle" size={50} onChangeText={text=>setfirstName(text)}/>
                    <TextBox title="ADDRESS" underline={true} onChangeText={text=>setaddress(text)}/>
                    <TextBox title="STATE" underline={true} onChangeText={text=>setstate(text)}/>
                    <TextBox title="ZIP CODE" underline={true} onChangeText={text=>setzipcode(text)}/>
                    <TextBox title="PHONE NO" underline={true} onChangeText={text=>setphoneNo(text)}/>
                    <TextBox title="EMAIL" underline={true} onChangeText={text=>setusername(text)} disabled={false} />
                    <TextBox title="PASSWORD" underline={true} onChangeText={text=>setpassword(text)}  disabled={false}/>

                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between' ,marginBottom: -20,marginRight: -20}}>
                    <Text style={styles.subText}>1/2</Text>
                    <TouchableOpacity onPress={()=>{newUser(username,password,firstName,address,state,zipcode,phoneNo,navigation)}}><GradientButton style={styles.button} /></TouchableOpacity>
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