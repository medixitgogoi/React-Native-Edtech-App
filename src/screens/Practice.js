<ScrollView>
    <View style={{ marginHorizontal: 13, marginTop: 10 }}>
        <View style={{ width: "100%", flexDirection: "row", gap: 5, alignItems: "center" }}>
            <TouchableOpacity
                onPress={() => navigation.navigate("DownloadPDF")}
                style={{ width: "50%" }}
            >
                <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={{ width: "100%", borderRadius: 5, padding: 10, alignItems: "center" }}
                >
                    <FontAwesome6 name="file-pdf"
                        style={{ fontSize: responsiveFontSize(3), }}
                    />
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: responsiveFontSize(2),
                            fontWeight: "500",
                            paddingTop: 5
                        }}>Download </Text>
                </LinearGradient>

            </TouchableOpacity>

            <TouchableOpacity
                style={{ width: "50%" }}
                SubjuctsNote
            // onPress={()=>navigation.navigate("SubjuctsNote")}
            >
                <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={{ width: "100%", borderRadius: 5, padding: 10, alignItems: "center" }}
                >
                    <Foundation name="clipboard-notes"
                        style={{ fontSize: responsiveFontSize(3.5), }}
                    />
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: responsiveFontSize(2),
                            fontWeight: "500",
                            paddingTop: 2
                        }}>Notes</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    </View>

    <View style={{ marginTop: 15, marginLeft: 10, marginBottom: 15, flexDirection: 'row', alignItems: "center" }}>
        <View style={{
            backgroundColor: '#7e94f5',
            padding: 5,
            borderRadius: 10
        }}>
            <MaterialIcons
                style={{ fontSize: responsiveFontSize(2), color: "#fff" }}
                name="video-library"

            />
        </View>

        <Text style={{
            color: "#fff",
            fontSize: responsiveFontSize(2.5),
            fontWeight: "700",
            paddingLeft: 8
        }}>
            Science Tutorials List
        </Text>
    </View>

    <TouchableOpacity
        onPress={() => navigation.navigate("VideoPlayer")}
        style={{ marginHorizontal: 10 }}>
        <View style={{
            width: "100%",
            flexDirection: "row",
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            padding: 10,
            borderRadius: 5
        }}>
            <View style={{ width: "25%", alignItems: "center" }}>

                <Image
                    source={require('../assets/Chemicalreactions.png')}
                    style={{ height: 70, width: 70 }}
                />
            </View>

            <View style={{ width: "70%" }}>
                <View style={{}}>
                    <Text style={{
                        color: "#fff",
                        fontSize: responsiveFontSize(2),
                        fontWeight: "700",
                        paddingLeft: 8,
                        paddingTop: 5
                    }}>
                        Introduction
                    </Text>
                </View>

                <View style={{}}>
                    <Text style={{
                        color: "#fff",
                        fontSize: responsiveFontSize(1.8),
                        fontWeight: "300",
                        paddingLeft: 8,
                        paddingTop: 2
                    }}>
                        Chemical Reactions
                    </Text>
                </View>

                <View style={{}}>
                    <Text style={{
                        color: "#fff",
                        fontSize: responsiveFontSize(1.8),
                        fontWeight: "300",
                        paddingLeft: 8,
                        paddingTop: 2
                    }}>
                        Science (English)
                    </Text>
                </View>

            </View>
        </View>
    </TouchableOpacity>

    <TouchableOpacity
        onPress={() => navigation.navigate("VideoPlayer")}
        style={{ marginHorizontal: 10, marginTop: 2 }}>
        <View style={{
            width: "100%",
            flexDirection: "row",
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            padding: 10,
            borderRadius: 5
        }}>
            <View style={{ width: "25%", alignItems: "center" }}>

                <Image
                    source={require('../assets/Chemicalreactions.png')}
                    style={{ height: 70, width: 70 }}
                />
            </View>

            <View style={{ width: "70%" }}>
                <View style={{}}>
                    <Text style={{
                        color: "#fff",
                        fontSize: responsiveFontSize(2),
                        fontWeight: "700",
                        paddingLeft: 8,
                        paddingTop: 5
                    }}>
                        Introduction
                    </Text>
                </View>

                <View style={{}}>
                    <Text style={{
                        color: "#fff",
                        fontSize: responsiveFontSize(1.8),
                        fontWeight: "300",
                        paddingLeft: 8,
                        paddingTop: 2
                    }}>
                        Chemical Reactions
                    </Text>
                </View>

                <View style={{}}>
                    <Text style={{
                        color: "#fff",
                        fontSize: responsiveFontSize(1.8),
                        fontWeight: "300",
                        paddingLeft: 8,
                        paddingTop: 2
                    }}>
                        Science (English)
                    </Text>
                </View>

            </View>
        </View>
    </TouchableOpacity>

    <TouchableOpacity
        onPress={() => navigation.navigate("VideoPlayer")}
        style={{ marginHorizontal: 10, marginTop: 2 }}>
        <View style={{
            width: "100%",
            flexDirection: "row",
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            padding: 10,
            borderRadius: 5
        }}>
            <View style={{ width: "25%", alignItems: "center" }}>

                <Image
                    source={require('../assets/Chemicalreactions.png')}
                    style={{ height: 70, width: 70 }}
                />
            </View>

            <View style={{ width: "70%" }}>
                <View style={{}}>
                    <Text style={{
                        color: "#fff",
                        fontSize: responsiveFontSize(2),
                        fontWeight: "700",
                        paddingLeft: 8,
                        paddingTop: 5
                    }}>
                        Introduction
                    </Text>
                </View>

                <View style={{}}>
                    <Text style={{
                        color: "#fff",
                        fontSize: responsiveFontSize(1.8),
                        fontWeight: "300",
                        paddingLeft: 8,
                        paddingTop: 2
                    }}>
                        Chemical Reactions
                    </Text>
                </View>

                <View style={{}}>
                    <Text style={{
                        color: "#fff",
                        fontSize: responsiveFontSize(1.8),
                        fontWeight: "300",
                        paddingLeft: 8,
                        paddingTop: 2
                    }}>
                        Science (English)
                    </Text>
                </View>

            </View>
        </View>
    </TouchableOpacity>

    <TouchableOpacity
        onPress={() => navigation.navigate("VideoPlayer")}
        style={{ marginHorizontal: 10, marginTop: 2 }}>
        <View style={{
            width: "100%",
            flexDirection: "row",
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            padding: 10,
            borderRadius: 5
        }}>
            <View style={{ width: "25%", alignItems: "center" }}>

                <Image
                    source={require('../assets/Chemicalreactions.png')}
                    style={{ height: 70, width: 70 }}
                />
            </View>

            <View style={{ width: "70%" }}>
                <View style={{}}>
                    <Text style={{
                        color: "#fff",
                        fontSize: responsiveFontSize(2),
                        fontWeight: "700",
                        paddingLeft: 8,
                        paddingTop: 5
                    }}>
                        Introduction
                    </Text>
                </View>

                <View style={{}}>
                    <Text style={{
                        color: "#fff",
                        fontSize: responsiveFontSize(1.8),
                        fontWeight: "300",
                        paddingLeft: 8,
                        paddingTop: 2
                    }}>
                        Chemical Reactions
                    </Text>
                </View>

                <View style={{}}>
                    <Text style={{
                        color: "#fff",
                        fontSize: responsiveFontSize(1.8),
                        fontWeight: "300",
                        paddingLeft: 8,
                        paddingTop: 2
                    }}>
                        Science (English)
                    </Text>
                </View>

            </View>
        </View>
    </TouchableOpacity>
</ScrollView>

// scrollView: {
//     width: '100%',
//     },
// image: {
//     width: width - 20,
//         height: 180,
//             borderRadius: 5,
//                 marginHorizontal: 10,
//     },
// container: {
//     flex: 1,
//         justifyContent: 'center',
//             alignItems: 'center',
//     },
// imageContainer: {
//     width: width * 0.7,
//         justifyContent: 'center',
//             alignItems: 'center',
//     },
// imagess: {
//     width: width * 0.7,
//         height: width * 0.7,
//             resizeMode: 'contain',
//                 borderRadius: 5,
//     },
// dotContainer: {
//     flexDirection: 'row',
//         justifyContent: 'center',
//             marginTop: 10,
//     },
// dot: {
//     height: 8,
//         width: 8,
//             borderRadius: 4,
//                 marginHorizontal: 4,
//     },