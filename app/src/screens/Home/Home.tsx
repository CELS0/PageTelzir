import React from 'react'
import { View, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Background } from '../../components/Background/Background'
import { ConsultPlans } from '../../components/ConsultPlans/ConsultPlans'
import { Profile } from '../../components/Profile/Profile'
import { useAuth } from '../../hooks/auth'
import { styles } from './styles'




export function Home() {
    const { signOut } = useAuth();

    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Profile />
                    <RectButton onPress={signOut}>
                        <Text style={styles.close}>
                            Sair
                        </Text>
                    </RectButton>
                </View>
                <ConsultPlans />
            </View>
        </Background>
    )
}