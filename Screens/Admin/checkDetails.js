import React from "react";
import {

    StyleSheet,
    Dimensions,
} from "react-native";
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob'
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../Assets/color';
import Header from '../../Components/TwoButtonHeader'

export default function PdfViewer({ navigation, route }) {
    const download = () => {
        let dirs = RNFetchBlob.fs.dirs
        if (route.params?.reportUrl) {
            RNFetchBlob
                .config({
                    fileCache: true,
                    path: dirs.DocumentDir + '/file.pdf'
                })
                .fetch('GET', route.params.reportUrl, {
                    //some headers ..
                })
                .then((res) => {
                    // the temp file path
                })
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} icon="ios-download" title="TRANSACTION" onPress={() => download()} />
            {
                route.params?.reportUrl ?
                    <Pdf
                        source={{ uri: route.params.reportUrl, cache: true }}
                        onLoadComplete={(numberOfPages, filePath) => {
                        }}
                        onPageChanged={(page, numberOfPages) => {
                        }}
                        onError={(error) => {
                        }}
                        onPressLink={(uri) => {
                        }}
                        style={styles.pdf} />
                    : null
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primaryWhite

    },
    pdf: {
        flex: 1,
        backgroundColor: color.primaryWhite,
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