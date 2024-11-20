import { View, Text, TouchableOpacity, FlatList, StatusBar, Dimensions, SafeAreaView, ScrollView } from 'react-native';
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
    { id: '1', name: 'React Basics', lectures: 20, notes: 'Yes', expiry: '2024-12-31', progress: 75 },
    { id: '2', name: 'Advanced React', lectures: 30, notes: 'No', expiry: '2025-01-15', progress: 50 },
    { id: '3', name: 'React Native', lectures: 25, notes: 'Yes', expiry: '2025-02-10', progress: 30 },
    { id: '4', name: 'Node.js Essentials', lectures: 18, notes: 'Yes', expiry: '2024-11-30', progress: 80 },
    { id: '5', name: 'Express.js Advanced', lectures: 22, notes: 'No', expiry: '2024-12-15', progress: 65 },
    { id: '6', name: 'JavaScript Mastery', lectures: 40, notes: 'Yes', expiry: '2025-01-05', progress: 55 },
    { id: '7', name: 'HTML & CSS Fundamentals', lectures: 15, notes: 'Yes', expiry: '2024-12-01', progress: 95 },
    { id: '8', name: 'TypeScript Deep Dive', lectures: 35, notes: 'No', expiry: '2025-02-20', progress: 40 },
    { id: '9', name: 'Next.js Full Stack', lectures: 28, notes: 'Yes', expiry: '2025-01-25', progress: 20 },
    { id: '10', name: 'Redux State Management', lectures: 16, notes: 'No', expiry: '2025-01-10', progress: 70 },
    { id: '11', name: 'REST APIs with Express', lectures: 21, notes: 'Yes', expiry: '2025-02-05', progress: 35 },
    { id: '12', name: 'React Testing Library', lectures: 12, notes: 'No', expiry: '2024-12-20', progress: 90 },
];


const Purchases = () => {

    const renderCourse = ({ item }) => (
        <View
            style={{
                padding: 15,
                marginVertical: 10,
                backgroundColor: '#f0f8ff',
                borderRadius: 14,
                elevation: 3,
            }}
        >
            {/* Course Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0047ab' }}>{item.name}</Text>
                <Icon name="book" size={24} color="#0047ab" />
            </View>

            {/* Details Section */}
            <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Icon name="collections-bookmark" size={18} color="#555" />
                    <Text style={{ fontSize: 14, color: '#555', marginLeft: 5 }}>Lectures: {item.lectures}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Icon name="note" size={18} color="#555" />
                    <Text style={{ fontSize: 14, color: '#555', marginLeft: 5 }}>Notes: {item.notes}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Icon name="date-range" size={18} color="#555" />
                    <Text style={{ fontSize: 14, color: '#555', marginLeft: 5 }}>Expiry: {item.expiry}</Text>
                </View>
            </View>

            {/* Progress Bar */}
            <View style={{ marginTop: 10 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 5,
                        height: 8,
                        backgroundColor: '#e0e0e0',
                        borderRadius: 4,
                    }}
                >
                    <View
                        style={{
                            width: `${item.progress}%`,
                            backgroundColor: '#32cd32',
                            height: '100%',
                            borderRadius: 4,
                        }}
                    />
                </View>
                <Text style={{ fontSize: 12, color: '#555' }}>Progress: {item.progress}%</Text>
            </View>

            {/* Time Left */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Icon name="access-time" size={18} color="#555" />
                <Text style={{ fontSize: 12, color: '#555', marginLeft: 5 }}>
                    Time Left: {100 - item.progress}%
                </Text>
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
                contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 1 }}
            />
        </SafeAreaView>
    );
};

export default Purchases;
