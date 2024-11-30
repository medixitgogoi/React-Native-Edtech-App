import { useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, 1000)
    }, [])

    return (
        <LinearGradient
            colors={['#fff', '#6ef5a0']} // Gradient colors
            style={{
                flex: 1, // Full screen
                justifyContent: 'center', // Center content vertically
                alignItems: 'center', // Center content horizontally
            }}
        >
            <StatusBar
                animated={true}
                backgroundColor={'#fff'}
                barStyle="dark-content"
            />

            <Animatable.View
                animation="bounceIn"
                duration={2000}
                style={{ height: 350, width: 300, alignSelf: 'center' }}
            >
                <Animatable.Image
                    source={require('../assets/logo.png')}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    resizeMode="cover"
                    animation="pulse" // Pulse effect for logo
                    iterationCount="infinite" // Makes the pulse animation loop
                />
            </Animatable.View>
        </LinearGradient>
    );
};

export default SplashScreen;