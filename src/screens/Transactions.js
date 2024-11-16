import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity, FlatList, RefreshControl, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Entypo from 'react-native-vector-icons/dist/Entypo';

const Transactions = () => {

    const navigation = useNavigation();
    const backgroundColor = "#000";

    return (
        <View style={{ flex: 1, backgroundColor: backgroundColor }}>
            <StatusBar
                animated={true}
                backgroundColor={backgroundColor}
                translucent={false}
                barStyle={"light-content"}
            />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo
                        style={styles.backButton}
                        name="chevron-left" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Transactions</Text>
            </View>

            <View style={{ backgroundColor: 'rgba(166, 166, 166, 0.6)', padding: 10, marginTop: 5, marginHorizontal: 10, borderRadius: 9 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: responsiveFontSize(1.9), color: "#fff", fontWeight: "500" }}>
                        Transaction Amount :
                    </Text>
                    <Text style={{ fontSize: responsiveFontSize(1.9), color: "#fff", fontWeight: "600", paddingRight: 10 }}>
                        250.00
                    </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 5 }}>
                    <Text style={{ fontSize: responsiveFontSize(1.9), color: "#fff" }}>
                        Date : 12-05-2024
                    </Text>

                    <View style={{ backgroundColor: "#003243", paddingHorizontal: 8, paddingVertical: 5, borderRadius: 50 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.5) }}>
                            Successful
                        </Text>
                    </View>
                </View>
            </View>

            <View style={{ backgroundColor: 'rgba(166, 166, 166, 0.6)', padding: 10, marginTop: 5, marginHorizontal: 10, borderRadius: 9 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: responsiveFontSize(1.9), color: "#fff", fontWeight: "500" }}>
                        Transaction Amount :
                    </Text>
                    <Text style={{ fontSize: responsiveFontSize(1.9), color: "#fff", fontWeight: "600", paddingRight: 10 }}>
                        250.00
                    </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 5 }}>
                    <Text style={{ fontSize: responsiveFontSize(1.9), color: "#fff" }}>
                        Date : 12-05-2024
                    </Text>

                    <View style={{ backgroundColor: "#003243", paddingHorizontal: 8, paddingVertical: 5, borderRadius: 50 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.5) }}>
                            Successful
                        </Text>
                    </View>
                </View>
            </View>

            <View style={{ marginBottom: 45 }}></View>
        </View>
    )
}

export default Transactions;

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#0d1116",
        paddingVertical: 4,
        elevation: 1,
        position: 'relative',
        zIndex: 20,
        height: 45,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: "center",
    },

    headerText: {
        fontSize: responsiveFontSize(2),
        color: "#fff",
        paddingLeft: 10
    },

    backButton: {
        backgroundColor: 'rgba(160, 160, 160, 0.5)',
        padding: 2,
        fontSize: responsiveFontSize(3),
        color: "#fff",
        borderRadius: 50
    },

});