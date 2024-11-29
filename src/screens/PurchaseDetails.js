import { View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, darkBlue, lightBlue } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const PurchaseDetails = ({ navigation, route }) => {

    const { data } = route?.params;

    // Calculate days left until expiry
    const currentDate = new Date();
    const expiryDate = new Date(data.expiry);
    const daysLeft = Math.max(0, Math.ceil((expiryDate - currentDate) / (1000 * 60 * 60 * 24)));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, justifyContent: 'space-between', marginBottom: 15, marginHorizontal: 10 }}>
                <TouchableOpacity style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: darkBlue }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3) }}>Purchase Details</Text>
                <View style={{ width: 35, height: 35 }} />
            </View>

            {/* Content */}
            <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
                {/* Course Name */}
                <View style={{ marginBottom: 20, height: 42, alignItems: 'center', backgroundColor: lightBlue, borderRadius: 12, borderColor: darkBlue, borderWidth: 1, elevation: 1, justifyContent: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '700', color: darkBlue }}>{data.name}</Text>
                </View>

                {/* Details Section */}
                <View style={{ marginBottom: 20, backgroundColor: '#fff', borderRadius: 12, elevation: 1, borderColor: darkBlue, borderWidth: 0.4, overflow: 'hidden' }}>
                    <View style={{ backgroundColor: darkBlue, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', height: 37 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: '#fff', textAlign: 'center', textTransform: 'uppercase' }}>Course Details:</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8, marginHorizontal: 20, marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 20, justifyContent: 'center' }}>
                            <MaterialIcons name="library-books" size={responsiveFontSize(2.2)} color={darkBlue} />
                        </View>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>Lectures:</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>{data.lectures}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8, marginHorizontal: 20, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 20, justifyContent: 'center' }}>
                            <FontAwesome name="book" size={15} color={darkBlue} />
                        </View>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>Notes:</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>{data.notes}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8, marginHorizontal: 20, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 20, justifyContent: 'center' }}>
                            <FontAwesome name="calendar" size={13} color={darkBlue} />
                        </View>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>Expiry Date:</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>{data.expiry}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginHorizontal: 20, marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 20, justifyContent: 'center' }}>
                            <FontAwesome name="hourglass-half" size={13} color={darkBlue} />
                        </View>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>Days Left:</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>{daysLeft} days</Text>
                    </View>
                </View>

                {/* Progress Bar */}
                <View style={{ marginBottom: 20, padding: 20, backgroundColor: '#fff', borderRadius: 12, elevation: 1 }}>
                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: darkBlue, marginBottom: 10 }}>Progress:</Text>
                    <View style={{ height: 10, backgroundColor: '#e0e0e0', borderRadius: 8, overflow: 'hidden' }}>
                        <View style={{ width: `${data.progress}%`, height: '100%', backgroundColor: lightBlue }} />
                    </View>
                    <Text style={{ fontSize: responsiveFontSize(1.8), color: '#555', marginTop: 5 }}>{data.progress}% Completed</Text>
                </View>

                {/* Price */}
                <View style={{ marginBottom: 20, padding: 20, backgroundColor: '#fff', borderRadius: 12, elevation: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '700', color: darkBlue }}>Price:</Text>
                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '700', color: lightBlue }}>₹{data.price}</Text>
                </View>
            </ScrollView>

            {/* Action Buttons */}
            <TouchableOpacity style={{ backgroundColor: '#FF5252', paddingVertical: 15, borderRadius: 10, alignItems: 'center', position: 'absolute', bottom: 8, width: '97%', alignSelf: 'center' }}>
                <Text style={{ color: '#fff', fontSize: responsiveFontSize(2), fontWeight: '600' }}>Contact Support</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default PurchaseDetails;