import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
} from "react-native";
import Reinput from 'reinput';
function TextBox(props){

return(
    <View style={styles.container}>
        <Reinput style={{marginTop:30}} fontFamily="Montserrat-SemiBold" fontSize={12} marginBottom={0} height={20} underlineHeight={0} labelActiveScale={0.7} underlineActiveHeight={0} label={props.title} />
    </View>
    );

}

export default TextBox;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:10,


    },
    title:{
        fontFamily:'Montserrat-SemiBold',
        fontSize:10,
        letterSpacing:2,
        opacity:0.5
    },
    textbox:{
        fontSize:15,
    }

});