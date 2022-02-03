import React, { ReactNode } from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'
import GloboIcon from '../../assets/globoIcon.svg'
import { useAuth } from '../../hooks/auth';

export function Profile() {
    const { user } = useAuth();

    return (
        <View style={styles.container} >
            <GloboIcon />
            <View>
                <View style={styles.user}>

                    <Text style={styles.greeting}>
                        {`Olá, ${user?.name}.`}
                    </Text>
                </View>
                <Text style={styles.message}>
                    Seja bem-vindo a Telzir
                </Text>
            </View>
        </View>
    )
}