import React from 'react';
import { ImageBackground, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"
import { colors } from '../../colors/colors';

function CustomNavigationHeader({ onPress, label, showBack }) {
    return (
        <View style={styles.headerContainer}>
            <ImageBackground
                style={styles.imageBackground}
                source={require('../../assets/images/candles.png')}
            >
                <View style={styles.overlay} >

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity>
                           {showBack &&  <Icon name="arrow-back-ios" color="black" size={22} />}
                        </TouchableOpacity>

                        <View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10
                            }}>
                                <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={require('../../assets/images/images.jpeg')} />
                                <View>
                                    <Text style={styles.title}>The Birthday Club</Text>
                                    <Text style={styles.subTitle}>The Birthday Club</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Icon name="settings" color="black" size={32} />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 70,
        borderBottomColor:"gray",
        borderBottomWidth:4

    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: 70,
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.black
    },
    subTitle: {
        fontSize: 14,
        fontWeight: "bold"
    }
});

export default CustomNavigationHeader;
