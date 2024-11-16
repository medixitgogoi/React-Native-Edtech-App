import { View, Text } from 'react-native'
import React from 'react'

const VideoItem = ({ navigation, imageSource, title, subtitle, language }) => (
    <TouchableOpacity
        onPress={() => navigation.navigate("UtubeVideo")}
        style={{ marginHorizontal: 10, marginTop: 2 }}
    >
        <View style={{ width: "100%", flexDirection: "row", backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: 10, borderRadius: 5 }}>
            <View style={{ width: "25%", alignItems: "center" }}>
                <Image source={imageSource} style={{ height: 70, width: 70 }} />
            </View>
            <View style={{ width: "70%" }}>
                <Text style={{ color: "#fff", fontSize: responsiveFontSize(2), fontWeight: "700", paddingLeft: 8, paddingTop: 5 }}>
                    {title}
                </Text>
                <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "300", paddingLeft: 8, paddingTop: 2 }}>
                    {subtitle}
                </Text>
                <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8), fontWeight: "300", paddingLeft: 8, paddingTop: 2 }}>
                    {language}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
);

export default VideoItem;