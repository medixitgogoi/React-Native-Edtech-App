import { View, Text, TouchableOpacity, FlatList, StatusBar, Dimensions, SafeAreaView, ScrollView, Image } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import { useNavigation } from '@react-navigation/native';
import { background, darkBlue, lightBlue } from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';

const courses = [
    { id: '1', title: 'React Native for Beginners', image: 'https://example.com/course1.jpg', price: 499, instructor: 'John Doe', time: 120 },
    { id: '2', title: 'Mastering JavaScript', image: 'https://example.com/course2.jpg', price: 799, instructor: 'Jane Smith', time: 180 },
    { id: '3', title: 'Advanced React', image: 'https://example.com/course3.jpg', price: 999, instructor: 'Alice Johnson', time: 150 },
    { id: '4', title: 'Fullstack Development Bootcamp', image: 'https://example.com/course4.jpg', price: 1499, instructor: 'Bob Williams', time: 300 },
    { id: '5', title: 'Intro to TypeScript', image: 'https://example.com/course5.jpg', price: 599, instructor: 'Emma Brown', time: 90 },
    { id: '6', title: 'Node.js for Beginners', image: 'https://example.com/course6.jpg', price: 499, instructor: 'Chris Green', time: 120 },
    { id: '7', title: 'Building APIs with Express', image: 'https://example.com/course7.jpg', price: 699, instructor: 'Olivia White', time: 150 },
    { id: '8', title: 'Understanding Redux', image: 'https://example.com/course8.jpg', price: 799, instructor: 'Sophia Davis', time: 180 },
    { id: '9', title: 'Deploying Apps with Docker', image: 'https://example.com/course9.jpg', price: 999, instructor: 'Liam Martinez', time: 200 },
    { id: '10', title: 'Kubernetes Fundamentals', image: 'https://example.com/course10.jpg', price: 1199, instructor: 'Ethan Taylor', time: 240 },
];

const Store = () => {

    const totalPrice = courses.reduce((sum, course) => sum + course?.price, 0);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingHorizontal: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, justifyContent: 'space-between', marginBottom: 5 }}>
                <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>Your Cart</Text>
                <View style={{ width: 35, height: 35 }} />
            </View> */}

            <FlatList
                data={courses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 15, borderRadius: 14, padding: 12, elevation: 1 }}>
                        <Image source={require('../assets/maths.png')} style={{ width: 80, height: 80, borderRadius: 10, marginRight: 15 }} />

                        <View style={{ justifyContent: 'space-between', flex: 1 }}>
                            <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: darkBlue }}>{item.title}</Text>
                            <Text style={{ color: '#a2a2a2', fontSize: responsiveFontSize(1.8), marginBottom: 5, fontWeight: '500' }}>By {item.instructor}</Text>
                            <Text style={{ color: '#212121', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>{item.time} mins</Text>
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#000', fontWeight: '600' }}>₹{item.price}</Text>
                        </View>
                    </View>
                )}
                ListHeaderComponent={
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, justifyContent: 'space-between', marginBottom: 5 }}>
                        <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue }} onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                        </TouchableOpacity>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>Your Cart</Text>
                        <View style={{ width: 35, height: 35 }} />
                    </View>
                }
                ListFooterComponent={
                    <View style={{ marginTop: 20, paddingVertical: 20, borderTopWidth: 1, borderColor: '#E0E0E0', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 10 }}>Total: ₹{totalPrice}</Text>
                        <TouchableOpacity style={{ backgroundColor: '#4CAF50', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20 }}>
                            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>Proceed to Checkout</Text>
                        </TouchableOpacity>
                    </View>
                }
                contentContainerStyle={{ paddingHorizontal: 1 }}
            />

        </SafeAreaView>
    );
};

export default Store;