{/* Buttons */ }
<View style={{ marginTop: 20, }}>
    {/* Sign up button */}
    <LinearGradient
        colors={[darkBlue, '#5badff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ borderRadius: 12, paddingHorizontal: 24, elevation: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
    >
        <TouchableOpacity onPress={registerUser} disabled={loading} style={{ gap: 5, height: 47, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {loading ? (
                <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600', }}>Signing you up ...</Text>
            ) : (
                <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600', }}>Sign up</Text>
            )}
            {!loading && <Icon4 name="arrowright" size={23} color='#fff' />}
        </TouchableOpacity>
    </LinearGradient>

    {/* Already have an account */}
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
        <Text style={{ color: '#333', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: darkBlue, fontSize: responsiveFontSize(1.8), fontWeight: '600' }}>Login</Text>
        </TouchableOpacity>
    </View>
</View>