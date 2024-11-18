{/* Lessons and time */ }
<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
    {/* Files */}
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
        <MaterialCommunityIcons name="file-multiple" size={responsiveFontSize(1.8)} color={'#0073c4'} />
        <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000', fontWeight: '500' }}>{item.files}</Text>
    </View>

    {/* Time */}
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
        <FontAwesome name="clock-o" size={responsiveFontSize(1.8)} color={'#0073c4'} />
        <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000', fontWeight: '500' }}>{item.time}</Text>
    </View>
</View>