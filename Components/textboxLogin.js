import React,{useState} from "react";
import { 
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Label, Item, Input } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
function TextBox(props){
const [textChanging, settextChanging] = useState(false)
return(
    <View style={styles.container}>
        <Item style={props.underline? null:{borderColor:'transparent'} } floatingLabel >
            <Label  style={styles.title} >{props.title}</Label>
            <Input onChangeText={props.onChangeText} onFocus={(e)=>settextChanging(true)} onBlur={()=>settextChanging(false)} secureTextEntry={props.title=="PASSWORD"? true :false}/>
        </Item>
        {textChanging? null:
       <View style={styles.icon}><Ionicons  name={props.icon} size={props.size? props.size : 25}/></View>
        }
    </View>
    );

}

export default TextBox;

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:20,


    },
    title:{
        fontFamily:'Montserrat-Bold',
        fontSize:12,
        letterSpacing:3,
        opacity:0.5,
        
    },
    textbox:{
        fontSize:15,
    },
    icon:{
        flex:1,
        marginTop:10,
        marginLeft:-70,
        opacity:0.5,
    },

});