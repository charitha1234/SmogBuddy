import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from "react-native";
import Pdf from 'react-native-pdf';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob'
import { SafeAreaView } from 'react-native-safe-area-context';
import {color} from '../../Assets/color';

export default function PdfViewer({ navigation, route }) {
    const download = () => {
        let dirs = RNFetchBlob.fs.dirs
        console.log(dirs.DocumentDir)
        RNFetchBlob
            .config({
                fileCache: true,
                path : dirs.DocumentDir + '/file.pdf'
            })
            .fetch('GET', 'https://storage.googleapis.com/smog-buddy-dev.appspot.com/reports/aaa.pdf', {
                //some headers ..
            })
            .then((res) => {
                // the temp file path
                console.log('The file saved to ', res.path())
            })
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}><Ionicons name="ios-close" size={40} /></TouchableOpacity>
                <Text style={styles.headerText}>TRANSACTION</Text>
                <TouchableOpacity style={{ marginRight: 20, marginLeft: -40 }} onPress={() => download()}><Ionicons name="ios-download" size={40} /></TouchableOpacity>
            </View>
            <Pdf
                source={{ uri: 'https://storage.googleapis.com/smog-buddy-dev.appspot.com/reports/aaa.pdf', cache: true }}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link presse: ${uri}`)
                }}
                style={styles.pdf} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:color.primaryWhite

    },
    pdf: {
        flex:1,
        backgroundColor:color.primaryWhite,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    headerContainer: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 25,
        letterSpacing: 2,
    },
    icon: {
        marginRight: -20,
        marginLeft: 20
    },
});