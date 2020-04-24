import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';
import firebase from 'react-native-firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../Assets/color';
import GradientButton from '../../Components/longButton';
import BaseUrl from '../../Config'


function Review(props) {
    const [Rating, setRating] = useState(0)
    const putReview=()=>{
        const user = firebase.auth().currentUser;
        fetch(BaseUrl.Url+'/user/review',
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
                    uid: user.uid,
                    rate: Rating
                  


            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {props.navigation.navigate("Home")})
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}><TouchableOpacity onPress={() => props.navigation.navigate("Home")} style={styles.icon}><Ionicons name="ios-close" size={40} /></TouchableOpacity></View>
            <View style={styles.ratingContainer}>

                <Text style={styles.headerText}>HOW WAS THE SERVICE?</Text>

                <AirbnbRating
                    count={8}
                    defaultRating={Rating}
                    size={30}
                    showRating={false}
                    onFinishRating={(rating) => setRating(rating)}
                />
            </View>
            <TouchableOpacity onPress={()=>{
                putReview()
            }} style={{ paddingBottom: 50, alignSelf: 'center' }} ><GradientButton title="SUBMIT" /></TouchableOpacity>
        </SafeAreaView>
    );

}

export default Review;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    ratingContainer: {
        width: 300,
        height: 150,
        alignSelf: 'center',
        backgroundColor: color.primaryWhite,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 5,
    },
    headerContainer: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        marginRight: -20,
        marginLeft: 20
    },
    headerText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        textAlign: 'center',
        letterSpacing: 2,
    }
});