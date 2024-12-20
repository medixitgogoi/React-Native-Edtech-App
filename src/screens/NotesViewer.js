import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, StatusBar, TouchableOpacity, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';

const NotesViewer = ({ route }) => {

    const navigation = useNavigation();

    const { width } = useWindowDimensions(); // Get screen width for RenderHTML

    const { data } = route?.params || '';
    const { heading } = route.params;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar
                animated={true}
                backgroundColor={'#fff'}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                    <Icon4 name="arrowleft" size={22} color={'#000'} />
                </TouchableOpacity>
                <View style={{ position: 'absolute', left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', }}>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>{heading}</Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView>
                <View style={{ flexDirection: 'column', paddingHorizontal: 12, marginTop: 0 }}>
                    <RenderHTML
                        contentWidth={width} // Use device width
                        source={{ html: data }} // Render the HTML disclaimer
                        tagsStyles={{
                            p: {
                                color: '#000',      // Black text
                            },
                            span: {
                                color: '#000',      // Black text for inline elements
                            }
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default NotesViewer;