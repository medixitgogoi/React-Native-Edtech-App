import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { useNavigation } from '@react-navigation/native';
import TabBar from '../components/TabBar';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import { blue1, blue3 } from '../utils/colors';

const { width } = Dimensions.get('window');
const imageSize = width / 2;

const images = [
    require('../assets/1.png'),
    require('../assets/2.png'),
    require('../assets/3.png'),
    require('../assets/4.png'),
];

const EnrolledCourses = () => {

    const backgroundColor = "#000";
    const navigation = useNavigation();

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Assume false for testing

    return (
        <View style={{ flex: 1, backgroundColor: backgroundColor }} >
            <StatusBar
                animated={true}
                backgroundColor={backgroundColor}
            />

            {/* Header */}
            <View style={{ height: responsiveHeight(7), flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 8, }}>
                {/* Back Button */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ borderRadius: 50, justifyContent: 'center', alignItems: 'center', width: responsiveWidth(9.5), aspectRatio: 1 / 1 }}>
                        <AntDesign name="arrowleft" style={{ color: '#fff' }} size={18} />
                    </LinearGradient>
                </TouchableOpacity>

                {/* Heading */}
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>Enrolled Courses</Text>
            </View>

            {/* Conditional Login Prompt */}
            {!isLoggedIn ? (
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, marginTop: 30 }}>
                    <Image source={require('../assets/login.png')} style={{ width: 150, height: 150, marginBottom: 15 }} />

                    <Text style={{ color: '#a2a2a2', fontSize: responsiveFontSize(2.1), textAlign: 'center', marginBottom: 20, fontWeight: '600' }}>Please log in to view your enrolled courses.</Text>

                    <LinearGradient
                        colors={[blue1, blue3]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ borderRadius: 10, elevation: 2, width: '40%', marginBottom: 10 }}
                    >
                        <TouchableOpacity
                            // onPress={handleSendOtpPress}
                            onPress={() => navigation.navigate('Login')}
                            style={{ gap: 5, height: 42, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}
                        >
                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(2), fontWeight: '600', textAlign: 'center', textTransform: 'uppercase' }}>Login</Text>
                            <MaterialIcons name="login" style={{ color: '#fff' }} size={20} />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            ) : (
                <FlatList
                    data={images}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("CourseDetails")}
                            style={{}}>
                            <Image
                                source={item}
                                style={styles.image}
                                resizeMode="contain"
                            />

                        </TouchableOpacity>
                    )}
                    numColumns={2}
                    contentContainerStyle={styles.imageContainer}
                />)}

            <TabBar />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: imageSize,
        height: 200,
        margin: 2,
        borderRadius: 10
    },
    imageContainer: {
        paddingHorizontal: 5,

    }
});

export default EnrolledCourses;