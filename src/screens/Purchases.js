import { View, Text, TouchableOpacity, FlatList, StatusBar, Dimensions, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6';

import Foundation from 'react-native-vector-icons/dist/Foundation';
import { useNavigation } from '@react-navigation/native';
import { background, darkBlue, lightBlue } from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const purchases = [
    { id: '1', name: 'React Basics', lectures: 20, notes: '17 files', expiry: '2024-12-31', progress: 75, price: 2499 },
    { id: '2', name: 'Advanced React', lectures: 30, notes: '14 files', expiry: '2025-01-15', progress: 50, price: 3999 },
    { id: '3', name: 'React Native', lectures: 25, notes: '17 files', expiry: '2025-02-10', progress: 30, price: 2999 },
    { id: '4', name: 'Node.js Essentials', lectures: 18, notes: '11 files', expiry: '2024-11-30', progress: 80, price: 2999 },
    { id: '5', name: 'Express.js Advanced', lectures: 22, notes: '7 files', expiry: '2024-12-15', progress: 65, price: 3499 },
    { id: '6', name: 'JavaScript Mastery', lectures: 40, notes: '8 files', expiry: '2025-01-05', progress: 55, price: 4999 },
    { id: '7', name: 'HTML & CSS Fundamentals', lectures: 15, notes: '14 files', expiry: '2024-12-01', progress: 95, price: 1999 },
    { id: '8', name: 'TypeScript Deep Dive', lectures: 35, notes: '18 iles', expiry: '2025-02-20', progress: 40, price: 3999 },
    { id: '9', name: 'Next.js Full Stack', lectures: 28, notes: '10 files', expiry: '2025-01-25', progress: 20, price: 4499 },
    { id: '10', name: 'Redux State Management', lectures: 16, notes: '12 files', expiry: '2025-01-10', progress: 70, price: 3499 },
    { id: '11', name: 'REST APIs with Express', lectures: 21, notes: '13 files filess', expiry: '2025-02-05', progress: 35, price: 3799 },
    { id: '12', name: 'React Testing Library', lectures: 12, notes: '17 files', expiry: '2024-12-20', progress: 90, price: 2199 },
];

const Purchases = ({ navigation }) => {

    const renderCourse = ({ item }) => (
        <View style={{ padding: 20, backgroundColor: '#ffffff', borderRadius: 14, elevation: 5, borderLeftWidth: 29, borderLeftColor: '#0066cc' }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0066cc' }}>{item.name}</Text>
                <Icon name="book" size={28} color="#0066cc" />
            </View>

            {/* Details Section */}
            <View style={{ marginBottom: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Icon name="collections-bookmark" size={20} color="#888" />
                    <Text style={{ fontSize: 14, color: '#555', marginLeft: 8 }}>Lectures: {item.lectures}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Icon name="note" size={20} color="#888" />
                    <Text style={{ fontSize: 14, color: '#555', marginLeft: 8 }}>Notes: {item.notes}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Icon name="date-range" size={20} color="#888" />
                    <Text style={{ fontSize: 14, color: '#555', marginLeft: 8 }}>Expiry: {item.expiry}</Text>
                </View>
            </View>

            {/* Progress Bar */}
            <View style={{ height: 10, backgroundColor: '#e0e0e0', borderRadius: 5, overflow: 'hidden', marginTop: 10, marginBottom: 5 }}>
                <View style={{ width: `${item.progress}%`, height: '100%', backgroundColor: '#32cd32' }} />
            </View>

            <Text style={{ fontSize: 12, color: '#555', marginBottom: 15 }}>Progress: {item.progress}%</Text>

            {/* Price and Time Left */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="monetization-on" size={20} color="#0066cc" />
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0066cc', marginLeft: 5 }}>${item.price}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="access-time" size={20} color="#888" />
                    <Text style={{ fontSize: 12, color: '#555', marginLeft: 5 }}>Time Left: {100 - item.progress}%</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingHorizontal: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3) }}>Your purchases</Text>
                <View style={{ width: 35, height: 35 }} />
            </View>

            <FlatList
                data={purchases}
                renderItem={renderCourse}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 1, paddingTop: 10, gap: 15 }}
            />
        </SafeAreaView>
    );
};

export default Purchases;

const styles = StyleSheet.create({
    card: {
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 15,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 5,
        borderLeftWidth: 4,
        borderLeftColor: '#0066cc',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    courseName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0066cc',
    },
    details: {
        marginBottom: 15,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    detailText: {
        fontSize: 14,
        color: '#555',
        marginLeft: 8,
    },
    progressBarWrapper: {
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 5,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#32cd32',
    },
    progressText: {
        fontSize: 12,
        color: '#555',
        marginBottom: 15,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0066cc',
        marginLeft: 5,
    },
    timeLeftWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeLeftText: {
        fontSize: 12,
        color: '#555',
        marginLeft: 5,
    },
});

