import React, { useRef } from 'react';
import { Text, TouchableOpacity, Animated, PanResponder } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FloatingDraggableButton = ({ onPress, icon = 'grid-outline', text = 'Change Board', color = '#003366' }) => {

    const position = useRef(new Animated.ValueXY({ x: 50, y: 100 })).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                position.setOffset({
                    x: position.x._value,
                    y: position.y._value,
                });
                position.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event(
                [null, { dx: position.x, dy: position.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                position.flattenOffset();
            },
        })
    ).current;

    return (
        <Animated.View
            style={{
                position: 'absolute',
                transform: [{ translateX: position.x }, { translateY: position.y }],
                zIndex: 1000,
            }}
            {...panResponder.panHandlers}
        >
            <TouchableOpacity
                onPress={onPress}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: color,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 25,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                }}
            >
                <Icon name={icon} size={20} color="white" style={{ marginRight: 8 }} />
                <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>{text}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default FloatingDraggableButton;