import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image,Animated } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const SidebarModal = ({ isVisible, onClose }) => {
    
    const [sidebaropen, setsidebaropen] = useState(false);
    const navigation = useNavigation();

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onSwipeComplete={onClose}
            swipeDirection="left"
            backdropOpacity={0.5}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            style={{ margin: 0 }}
        >
            <View style={{ backgroundColor: "#D9D9D9", width: "80%", flex: 1 }}>

                <View style={{ width: "100%", backgroundColor: "#0d1116", height: 150, alignItems: "center", justifyContent: "center" }}>
                    <View style={{}}>
                        <Image
                            source={require("../assets/user.jpg")}
                            style={{ width: 100, height: 100, borderRadius: 95 }}
                        />
                    </View>
                    <Text style={{ color: "#fff", fontSize: responsiveFontSize(2.7), fontWeight: "800", paddingTop: 5 }}>
                        Pollab kumar
                    </Text>
                </View>

                <ScrollView style={{ padding: 3, paddingHorizontal: 10, backgroundColor: "#0d1116" }}>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Account")}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            borderStyle: "dotted",
                            justifyContent: "space-between",
                            paddingHorizontal: 8,
                            marginTop: 11,
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            paddingVertical: 8,
                            borderRadius: 6
                        }}>
                        <View style={{ borderRadius: 70, flexDirection: "row", }}>
                            <FontAwesome name='user' size={20} color="#a6a6a6" />
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "400", paddingLeft: 7 }}>
                                My Profile
                            </Text>
                        </View>
                        <FontAwesome name='chevron-right' size={15} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("EditProfile")}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            // borderBottomWidth: 0.5,
                            borderStyle: "dotted",
                            justifyContent: "space-between",
                            paddingHorizontal: 8,
                            marginTop: 11,
                            // borderColor:"#fff",
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            paddingVertical: 8,
                            borderRadius: 6
                        }}>
                        <View style={{ borderRadius: 70, flexDirection: "row", }}>
                            <Ionicons name='school' size={20} color="#a6a6a6" />
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "400", paddingLeft: 7 }}>
                                Selected Academic
                            </Text>
                        </View>
                        <FontAwesome name='chevron-right' size={15} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Account")}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            // borderBottomWidth: 0.5,
                            borderStyle: "dotted",
                            justifyContent: "space-between",
                            paddingHorizontal: 8,
                            marginTop: 11,
                            // borderColor:"#fff",
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            paddingVertical: 8,
                            borderRadius: 6
                        }}>
                        <View style={{ borderRadius: 70, flexDirection: "row", }}>
                            <AntDesign name='questioncircle' size={20} color="#a6a6a6" />
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "400", paddingLeft: 7 }}>
                                Enquiry
                            </Text>
                        </View>
                        <FontAwesome name='chevron-right' size={15} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Account")}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            // borderBottomWidth: 0.5,
                            borderStyle: "dotted",
                            justifyContent: "space-between",
                            paddingHorizontal: 8,
                            marginTop: 11,
                            // borderColor:"#fff",
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            paddingVertical: 8,
                            borderRadius: 6
                        }}>
                        <View style={{ borderRadius: 70, flexDirection: "row", }}>
                            <FontAwesome name='file' size={20} color="#a6a6a6" />
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "400", paddingLeft: 7 }}>
                                T & c
                            </Text>
                        </View>
                        <FontAwesome name='chevron-right' size={15} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Account")}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            // borderBottomWidth: 0.5,
                            borderStyle: "dotted",
                            justifyContent: "space-between",
                            paddingHorizontal: 8,
                            marginTop: 11,
                            // borderColor:"#fff",
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            paddingVertical: 8,
                            borderRadius: 6
                        }}>
                        <View style={{ borderRadius: 70, flexDirection: "row", alignItems: "center" }}>
                            <AntDesign name='logout' size={15} color="#a6a6a6" />
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "400", paddingLeft: 7 }}>
                                LogOut
                            </Text>
                        </View>
                        <FontAwesome name='chevron-right' size={15} color="#fff" />
                    </TouchableOpacity>
                </ScrollView>

            </View>
        </Modal>
    );
};

export default SidebarModal;