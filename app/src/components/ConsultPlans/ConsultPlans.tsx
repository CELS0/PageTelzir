import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { api } from '../../services/api'
import { Buttonicon } from '../Buttonicon'
import { ColumnHeader } from '../ColumnHeader/ColumnHeader'
import { ListLocations } from '../ListLocations/ListLocations'
import { ListPlans } from '../ListPlans/ListPlans'
import { Smallinput } from '../Smallinput'
import { styles } from './styles'

export function ConsultPlans() {
    const [origin, setOrigin] = useState('');
    const [destiny, setDestiny] = useState('');
    const [time, setTime] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const mock = {
        origin: '018',
        destiny: '085',
        time: 60,
    };


    return (
        <>
            {
                isVisible
                    ?
                    <ListLocations />
                    :
                    <ListPlans data={mock} />
            }

            <LinearGradient
                style={styles.container}
                colors={['#202c3c', '#0b121d']}
            >
                <Text style={styles.label} >Origem*</Text>
                <Smallinput
                    onChangeText={setOrigin}
                />

                <Text style={styles.label} >Destino*</Text>
                <Smallinput
                    onChangeText={setDestiny}
                />

                <Text style={styles.label} >Tempo da ligação*</Text>
                <Smallinput
                    onChangeText={setTime}
                />

                <Buttonicon
                    title={isVisible ? 'Calcular custos' : 'Tabela de preços' }
                    onPress={() => setIsVisible(!isVisible)}
                />

            </LinearGradient>
        </>
    )
}