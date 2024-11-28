import { View, Text } from 'react-native';

const PurchaseDetails = ({ navigation, route }) => {

    const { data } = route.params;
    console.log(data);

    return (
        <View>
            <Text style={{ color: '#000' }}>PurchaseDetails</Text>
        </View>
    )
}

export default PurchaseDetails;