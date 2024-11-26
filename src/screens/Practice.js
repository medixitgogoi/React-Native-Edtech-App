import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { useNavigation } from '@react-navigation/native';
import { background } from '../utils/colors';

const EditProfile = () => {

    const backgroundColor = background;
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: background }} >
            <StatusBar
                animated={true}
                backgroundColor={background}
            />

            <View style={{
                backgroundColor: backgroundColor,
                paddingVertical: 4,
                elevation: 1,
                position: 'relative',
                zIndex: 20,
                height: 45,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: "center"
            }}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Entypo
                        style={{
                            backgroundColor: 'rgba(160, 160, 160, 0.5)',
                            padding: 2,
                            fontSize: responsiveFontSize(3),
                            color: "#fff",
                            borderRadius: 50
                        }}
                        name="chevron-left" />
                </TouchableOpacity>

                <Text style={{
                    fontSize: responsiveFontSize(2),
                    color: "#fff",
                    paddingLeft: 10
                }}>
                    Update Profile
                </Text>

            </View>

            <ScrollView>
                <View style={{ marginHorizontal: 12, marginTop: 10 }}>
                    <View style={{ marginTop: 5, width: "100%" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '15%', paddingVertical: 2, position: 'absolute', zIndex: 10, top: -10, left: 5, backgroundColor: "#0d1116" }}>
                            <Text style={{ color: '#fff', fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>Board </Text>
                        </View>
                        <View style={{}}>
                            <TextInput
                                style={{ paddingVertical: 8, fontSize: responsiveFontSize(1.8), fontWeight: "500", color: "#fff", borderWidth: 0.5, borderRadius: 5, paddingLeft: 9, borderColor: "grey" }}
                                placeholderTextColor="#6d6d6d"
                                placeholder='Enter Your Preferred Educational Board. '
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginHorizontal: 12, marginTop: 17 }}>
                    <View style={{ marginTop: 5, width: "100%" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '15%', paddingVertical: 2, position: 'absolute', zIndex: 10, top: -10, left: 5, backgroundColor: "#0d1116" }}>
                            <Text style={{ color: '#fff', fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>Class</Text>
                        </View>
                        <View style={{}}>
                            <TextInput
                                style={{ paddingVertical: 8, fontSize: responsiveFontSize(1.8), fontWeight: "500", color: "#fff", borderWidth: 0.5, borderRadius: 5, paddingLeft: 9, borderColor: "grey" }}
                                placeholderTextColor="#6d6d6d"
                                placeholder='Enter your Preferred Educational Class. '
                            />
                        </View>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                    <Text style={{ color: '#fff', fontWeight: '400', fontSize: responsiveFontSize(2.5) }}>
                        Basic Information
                    </Text>
                </View>

                <View style={{ marginHorizontal: 12, marginTop: 10 }}>
                    <View style={{ marginTop: 5, width: "100%" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '15%', paddingVertical: 2, position: 'absolute', zIndex: 10, top: -10, left: 5, backgroundColor: "#0d1116" }}>
                            <Text style={{ color: '#fff', fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>Name </Text>
                        </View>
                        <View style={{}}>
                            <TextInput
                                style={{ paddingVertical: 8, fontSize: responsiveFontSize(1.8), fontWeight: "500", color: "#fff", borderWidth: 0.5, borderRadius: 5, paddingLeft: 9, borderColor: "grey" }}
                                placeholderTextColor="#6d6d6d"
                                placeholder='Enter Your Name '
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginHorizontal: 12, marginTop: 17 }}>
                    <View style={{ marginTop: 5, width: "100%" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '15%', paddingVertical: 2, position: 'absolute', zIndex: 10, top: -10, left: 5, backgroundColor: "#0d1116" }}>
                            <Text style={{ color: '#fff', fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>Gender</Text>
                        </View>
                        <View style={{}}>
                            <TextInput
                                style={{ paddingVertical: 8, fontSize: responsiveFontSize(1.8), fontWeight: "500", color: "#fff", borderWidth: 0.5, borderRadius: 5, paddingLeft: 9, borderColor: "grey" }}
                                placeholderTextColor="#6d6d6d"
                                placeholder='Enter Gender Name '
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginHorizontal: 12, marginTop: 17 }}>
                    <View style={{ marginTop: 5, width: "100%" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '15%', paddingVertical: 2, position: 'absolute', zIndex: 10, top: -10, left: 5, backgroundColor: "#0d1116" }}>
                            <Text style={{ color: '#fff', fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>DOB</Text>
                        </View>
                        <View style={{}}>
                            <TextInput
                                style={{ paddingVertical: 8, fontSize: responsiveFontSize(1.8), fontWeight: "500", color: "#fff", borderWidth: 0.5, borderRadius: 5, paddingLeft: 9, borderColor: "grey" }}
                                placeholderTextColor="#6d6d6d"
                                placeholder='Enter Date Of Birth '
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginHorizontal: 12, marginTop: 12 }}>
                    <View style={{ marginTop: 5, width: "100%" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '15%', paddingVertical: 2, position: 'absolute', zIndex: 10, top: -10, left: 5, backgroundColor: "#0d1116" }}>
                            <Text style={{ color: '#fff', fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>Phone</Text>
                        </View>
                        <View style={{}}>
                            <TextInput
                                style={{ paddingVertical: 8, fontSize: responsiveFontSize(1.8), fontWeight: "500", color: "#fff", borderWidth: 0.5, borderRadius: 5, paddingLeft: 9, borderColor: "grey" }}
                                placeholderTextColor="grey"
                                placeholder='Enter Phone Number'
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginHorizontal: 12, marginTop: 17 }}>
                    <View style={{ marginTop: 5, width: "100%" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '15%', paddingVertical: 2, position: 'absolute', zIndex: 10, top: -10, left: 5, backgroundColor: "#0d1116" }}>
                            <Text style={{ color: '#fff', fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>Email</Text>
                        </View>
                        <View style={{}}>
                            <TextInput
                                style={{ paddingVertical: 8, fontSize: responsiveFontSize(1.8), fontWeight: "500", color: "#fff", borderWidth: 0.5, borderRadius: 5, paddingLeft: 9, borderColor: "grey" }}
                                placeholderTextColor="#6d6d6d"
                                placeholder='Enter Email Name '
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginHorizontal: 12, marginTop: 17 }}>
                    <View style={{ marginTop: 5, width: "100%" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '15%', paddingVertical: 2, position: 'absolute', zIndex: 10, top: -10, left: 5, backgroundColor: "#0d1116" }}>
                            <Text style={{ color: '#fff', fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>State</Text>
                        </View>
                        <View style={{}}>
                            <TextInput
                                style={{ paddingVertical: 8, fontSize: responsiveFontSize(1.8), fontWeight: "500", color: "#fff", borderWidth: 0.5, borderRadius: 5, paddingLeft: 9, borderColor: "grey" }}
                                placeholderTextColor="#6d6d6d"
                                placeholder='Enter State Name '
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginHorizontal: 12, marginTop: 17 }}>
                    <View style={{ marginTop: 5, width: "100%" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '13%', paddingVertical: 2, position: 'absolute', zIndex: 10, top: -10, left: 5, backgroundColor: "#0d1116" }}>
                            <Text style={{ color: '#fff', fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>City</Text>
                        </View>
                        <View style={{}}>
                            <TextInput
                                style={{ paddingVertical: 8, fontSize: responsiveFontSize(1.8), fontWeight: "500", color: "#fff", borderWidth: 0.5, borderRadius: 5, paddingLeft: 9, borderColor: "grey" }}
                                placeholderTextColor="#6d6d6d"
                                placeholder='Enter City Name '
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginHorizontal: 12, marginTop: 17 }}>
                    <View style={{ marginTop: 5, width: "100%" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '25%', paddingVertical: 2, position: 'absolute', zIndex: 10, top: -10, left: 5, backgroundColor: "#0d1116" }}>
                            <Text style={{ color: '#fff', fontWeight: '400', fontSize: responsiveFontSize(1.5) }}>School/College</Text>
                        </View>
                        <View style={{}}>
                            <TextInput
                                style={{ paddingVertical: 8, fontSize: responsiveFontSize(1.8), fontWeight: "500", color: "#fff", borderWidth: 0.5, borderRadius: 5, paddingLeft: 9, borderColor: "grey" }}
                                placeholderTextColor="#6d6d6d"
                                placeholder='Enter School/College Name'
                            />
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', paddingHorizontal: 10, marginBottom: 10, marginTop: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', width: "100%", alignItems: "center", paddingVertical: 10, borderRadius: 10 }}>
                        <Text style={{ color: "#fff", fontWeight: '600', fontSize: responsiveFontSize(1.9) }}>
                            Update Profile
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default EditProfile;

const styles = StyleSheet.create({});