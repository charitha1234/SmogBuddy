import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
} from "react-native";
import Reinput from 'reinput';
import { Container,Label, Header, Content, Item, Input, Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
function TextBox(props){

return(
    <View style={styles.container}>
        <Item style={{borderColor:'transparent'}} floatingLabel >
            <Label  style={styles.title} >{props.title}</Label>
            <Input secureTextEntry={props.title=="PASSWORD"? true :false}/>
        </Item>
        <Ionicons style={styles.icon} name={props.icon} size={25}/>
    </View>
    );

}

export default TextBox;

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:10,
        marginTop:30


    },
    title:{
        fontFamily:'Montserrat-Bold',
        fontSize:14,
        letterSpacing:3,
        opacity:0.5,
        
    },
    textbox:{
        fontSize:15,
    },
    icon:{
        marginLeft:-80,
        marginRight:50,
        opacity:0.5,
    }

});