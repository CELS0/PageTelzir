import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'



export type LocationProps = {
    origin: string,
    destiny: string,
    pricing: number,
};

type Props = {
    data: LocationProps;
}


export function Locations({data}:Props) {
    const { origin, destiny, pricing } = data;
    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <Text style={styles.title}>{origin}</Text>
                <Text style={styles.title}>{destiny}</Text>
                <Text style={styles.title}>R$ {pricing}</Text>
            </View>
        </View>
    )
}