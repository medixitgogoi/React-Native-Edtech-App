import { StyleSheet, Text, View, Dimensions, Image, StatusBar, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ViewPdf = () => {

    const navigation = useNavigation();

    const backgroundColor = "#000";

    return (
        <View style={{ flex: 1, backgroundColor }}>
            <StatusBar
                animated={true}
                backgroundColor="#000"
                barStyle={'light-content'}
            />

            <TouchableOpacity style={{ backgroundColor: backgroundColor, paddingVertical: 4, elevation: 1, position: 'relative', zIndex: 20, height: 45, paddingHorizontal: 10, flexDirection: 'row', alignItems: "center" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo style={{ backgroundColor: 'rgba(160, 160, 160, 0.5)', padding: 2, fontSize: responsiveFontSize(3), color: "#fff", borderRadius: 50 }} name="chevron-left" />
                </TouchableOpacity>
                <View style={{ marginLeft: 5 }}>
                    <Text style={{ fontSize: responsiveFontSize(2.2), color: "#fff" }}>
                        Subject-specific PDF
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <View style={{ width: "100%", flexDirection: "row", backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: 10, borderRadius: 5 }}>
                    <View style={{ width: "25%", alignItems: "center" }}>
                        <Image source={require('../assets/Chemicalreactions.png')} style={{ height: 70, width: 70 }} />
                    </View>

                    <View style={{ width: "60%" }}>
                        <View>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(2), fontWeight: "700", paddingLeft: 8, paddingTop: 5 }}>
                                Introduction
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "300", paddingLeft: 8, paddingTop: 2 }}>
                                Chemical Reactions
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "300", paddingLeft: 8, paddingTop: 2 }}>
                                Science (English)
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{ width: 50, height: 50, alignItems: "center", justifyContent: "center" }}>
                        <Feather style={{ backgroundColor: 'rgba(160, 160, 160, 0.5)', padding: 6, fontSize: responsiveFontSize(2.5), color: "#fff", borderRadius: 50 }} name="download" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginHorizontal: 10, marginTop: 2 }}>
                <View style={{ width: "100%", flexDirection: "row", backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: 10, borderRadius: 5 }}>
                    <View style={{ width: "25%", alignItems: "center" }}>
                        <Image source={require('../assets/Chemicalreactions.png')} style={{ height: 70, width: 70 }} />
                    </View>

                    <View style={{ width: "60%" }}>
                        <View>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(2), fontWeight: "700", paddingLeft: 8, paddingTop: 5 }}>
                                Introduction
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "300", paddingLeft: 8, paddingTop: 2 }}>
                                Chemical Reactions
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "300", paddingLeft: 8, paddingTop: 2 }}>
                                Science (English)
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{ width: "15%", alignItems: "center", justifyContent: "center" }}>
                        <Feather style={{ backgroundColor: 'rgba(160, 160, 160, 0.5)', padding: 6, fontSize: responsiveFontSize(2.5), color: "#fff", borderRadius: 50 }} name="download" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginHorizontal: 10, marginTop: 2 }}>
                <View style={{ width: "100%", flexDirection: "row", backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: 10, borderRadius: 5 }}>
                    <View style={{ width: "25%", alignItems: "center" }}>
                        <Image source={require('../assets/Chemicalreactions.png')} style={{ height: 70, width: 70 }} />
                    </View>

                    <View style={{ width: "60%" }}>
                        <View>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(2), fontWeight: "700", paddingLeft: 8, paddingTop: 5 }}>
                                Introduction
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "300", paddingLeft: 8, paddingTop: 2 }}>
                                Chemical Reactions
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "300", paddingLeft: 8, paddingTop: 2 }}>
                                Science (English)
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{ width: "15%", alignItems: "center", justifyContent: "center" }}>
                        <Feather style={{ backgroundColor: 'rgba(160, 160, 160, 0.5)', padding: 6, fontSize: responsiveFontSize(2.5), color: "#fff", borderRadius: 50 }} name="download" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginHorizontal: 10, marginTop: 2 }}>
                <View style={{ width: "100%", flexDirection: "row", backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: 10, borderRadius: 5 }}>
                    <View style={{ width: "25%", alignItems: "center" }}>
                        <Image source={require('../assets/Chemicalreactions.png')} style={{ height: 70, width: 70 }} />
                    </View>

                    <View style={{ width: "60%" }}>
                        <View>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(2), fontWeight: "700", paddingLeft: 8, paddingTop: 5 }}>Introduction</Text>
                        </View>
                        <View>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "300", paddingLeft: 8, paddingTop: 2 }}>Chemical Reactions</Text>
                        </View>
                        <View>
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "300", paddingLeft: 8, paddingTop: 2 }}>Science (English)</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{ width: "15%", alignItems: "center", justifyContent: "center" }}>
                        <Feather style={{ backgroundColor: 'rgba(160, 160, 160, 0.5)', padding: 6, fontSize: responsiveFontSize(2.5), color: "#fff", borderRadius: 50 }} name="download" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ViewPdf;

const styles = StyleSheet.create({});