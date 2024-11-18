import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { background } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Courses = () => {
    return (
        <View style={{ flex: 1, backgroundColor: background, }}>
            {/* Header */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'space-between' }}>
                <LinearGradient colors={['#2e4838', '#07682b']} style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 30, height: 30 }}>
                    <AntDesign name="arrowleft" style={{ color: '#fff' }} size={15} />
                </LinearGradient>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3) }}>All Courses</Text>
                </View>

                <View style={{ width: 35, height: 35 }}>

                </View>
            </TouchableOpacity>

            <View>

            </View>
        </View>
    )
}

export default Courses;