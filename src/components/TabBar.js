import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";

const TabBar = () => {

    const navigation = useNavigation();

    const route = useRoute();

    const primaryColor = "#181f29";
    const whiteColor = "#fff";

    // State to manage animation
    const [scaleValue] = useState(new Animated.Value(1.2));

    // Function to get the color based on active screen
    const getColor = (screen) => {
        return route.name === screen ? whiteColor : "#a2a2a2";
    }

    // Function to animate the scale
    const animateScale = () => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 1.2,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            })
        ]).start();
    }

    // Effect to animate on route change
    useEffect(() => {
        animateScale();
    }, [route.name]);

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                width: "100%",
                height: 53,
                flexDirection: "row",
                backgroundColor: primaryColor,
                alignItems: "center",
                justifyContent: "space-evenly",
                position: "absolute",
                bottom: 0,
            }}>
                {/* Home */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={styles.tabButton}
                >
                    <Animated.View style={[styles.iconContainer, { transform: [{ scale: route.name === 'Home' ? scaleValue : 1 }] }]}>
                        <Icon name='home' style={[styles.icon, { color: getColor('Home') }]} />
                        <Text style={[styles.text, { color: getColor('Home') }]}>Home</Text>
                    </Animated.View>
                </TouchableOpacity>

                {/* Enrolled Course */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("EnrolledCourses")}
                    style={styles.tabButton}
                >
                    <Animated.View style={[styles.iconContainer, { transform: [{ scale: route.name === 'EnrolledCourses' ? scaleValue : 1 }] }]}>
                        <Icon name='view-grid-plus-outline' style={[styles.icon, { color: getColor('EnrolledCourses') }]} />
                        <Text style={[styles.text, { color: getColor('EnrolledCourses') }]}>Enrolled Course</Text>
                    </Animated.View>
                </TouchableOpacity>

                {/* Transactions */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('Transactions')}
                    style={styles.tabButton}
                >
                    <Animated.View style={[styles.iconContainer, { transform: [{ scale: route.name === 'Transactions' ? scaleValue : 1 }] }]}>
                        <Icon2 name='user' style={[styles.icon, { color: getColor('Transactions') }]} />
                        <Text style={[styles.text, { color: getColor('Transactions') }]}>Transactions</Text>
                    </Animated.View>
                </TouchableOpacity>

                {/* Profile */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={styles.tabButton}
                >
                    <Animated.View style={[styles.iconContainer, { transform: [{ scale: route.name === 'Profile' ? scaleValue : 1 }] }]}>
                        <Icon2 name='user' style={[styles.icon, { color: getColor('Profile') }]} />
                        <Text style={[styles.text, { color: getColor('Profile') }]}>Account</Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TabBar;

const styles = StyleSheet.create({
    tabButton: {
        width: "25%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        fontSize: responsiveFontSize(2.6),
    },
    text: {
        fontSize: responsiveFontSize(1.40),
        fontWeight: "800",
    }
});