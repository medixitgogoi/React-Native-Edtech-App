import { View, Text, TouchableOpacity, FlatList, StatusBar, Dimensions, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

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

    const renderCourse = ({ item }) => {

        // Calculate days left
        const currentDate = new Date();
        const expiryDate = new Date(item.expiry); // Ensure expiry is a valid date string
        const timeDifference = expiryDate - currentDate; // Difference in milliseconds
        const daysLeft = Math.max(Math.ceil(timeDifference / (1000 * 60 * 60 * 24)), 0); // Convert to days and ensure non-negative

        return (
            <TouchableOpacity onPress={() => navigation.navigate('PurchaseDetails', { data: item })} style={{ padding: 18, backgroundColor: '#ffffff', borderRadius: 14, elevation: 5, borderLeftWidth: 25, borderLeftColor: '#0066cc' }}>
                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, gap: 5 }}>
                    <Icon name="book" size={22} color={darkBlue} />
                    <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#0066cc' }}>{item.name}</Text>
                </View>

                {/* Details Section */}
                <View style={{ marginBottom: 15, paddingLeft: 2 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, gap: 5 }}>
                        <Icon name="collections-bookmark" size={19} color="#888" />
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#555', fontWeight: '500' }}>Lectures: {item.lectures}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, gap: 5 }}>
                        <Icon name="note" size={19} color="#888" />
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#555', fontWeight: '500' }}>Notes: {item.notes}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, gap: 5 }}>
                        <Icon name="date-range" size={19} color="#888" />
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#555', fontWeight: '500' }}>Expiry: {item.expiry}</Text>
                    </View>
                </View>

                {/* Progress Bar */}
                <View style={{ height: 10, backgroundColor: '#e0e0e0', borderRadius: 8, overflow: 'hidden', marginBottom: 5 }}>
                    <View style={{ width: `${item.progress}%`, height: '100%', backgroundColor: '#32cd32' }} />
                </View>

                <Text style={{ fontSize: responsiveFontSize(1.6), color: '#000', marginBottom: 15, fontWeight: '500' }}>Progress: {item.progress}%</Text>

                {/* Price and Time Left */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                        <FontAwesome name="rupee" size={14} color="#0066cc" />
                        <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#0066cc', paddingBottom: 2 }}>{item.price}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                        <Icon name="access-time" size={18} color="#888" />
                        <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '500' }}>
                            {daysLeft > 0 ? `Time Left: ${daysLeft} days` : 'Expired'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

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

            {/* Content */}
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