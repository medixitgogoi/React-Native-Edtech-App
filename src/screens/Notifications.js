import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { background, darkBlue } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const Notifications = ({ navigation }) => {

    const notifications = [
        { id: '1', title: 'Assignment Due', message: 'Submit your math assignment by 5 PM today.', unread: true },
        { id: '2', title: 'Course Update', message: 'New video added in Physics course.', unread: true },
        { id: '3', title: 'Payment Success', message: 'Your subscription has been successfully renewed.', unread: false },
        { id: '4', title: 'Live Class', message: 'Join the live class on Chemistry at 6 PM.', unread: false },
    ];

    const renderNotification = ({ item }) => (
        <View style={{ backgroundColor: '#fff', padding: 14, borderRadius: 10, marginBottom: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2, borderLeftWidth: 4, borderLeftColor: item.unread ? '#FF5252' : '#0066cc', position: 'relative' }}>
            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold', color: '#333', marginBottom: 3 }}>{item.title}</Text>
            <Text style={{ fontSize: responsiveFontSize(1.8), color: '#666' }}>{item.message}</Text>
            {item.unread && <View style={{ position: 'absolute', top: 5, right: 5, backgroundColor: 'red', width: 12, height: 12, borderRadius: 6 }} />}
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: background, paddingHorizontal: 10, justifyContent: 'center', paddingTop: 5 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, justifyContent: 'space-between', marginBottom: 10 }}>
                <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3) }}>Notifications</Text>
                <View style={{ width: 35, height: 35 }} />
            </View>

            <FlatList
                data={notifications}
                renderItem={renderNotification}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 1, paddingTop: 1 }}
            />
        </View>
    );
};

export default Notifications;