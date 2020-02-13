import React from "react";
import { 
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import Reinput from 'reinput';
import { Label, Item, Input } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../Assets/color';
function TextBox(props){

return(
    <View style={styles.container}>
        <Item style={props.underline? null:{borderColor:'transparent'} } floatingLabel >
            <Label  style={styles.title} >{props.title}</Label>
            <Input secureTextEntry={props.title=="PASSWORD"? true :false}/>
        </Item>
        <TouchableOpacity style={{marginBottom:10}}><Ionicons style={[props.color? {color:'#ac47ff'}: {color:"black"}, styles.icon]} name={props.icon} size={props.size? props.size : 25}/>< Ionicons style={styles.icon1} name={props.icon2} size={15} /></TouchableOpacity>
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
        
        marginLeft:-70,
        zIndex:-1,
    },
    icon1:{
        color:color.buttonLower,
        marginTop:-20,
        marginLeft:-35,
        zIndex:1,
    }

});