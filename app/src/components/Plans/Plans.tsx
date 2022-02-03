import React from 'react'
import { View, Text } from 'react-native'
import { ReponseApiPlans } from '../ListPlans/ListPlans';
import { styles } from './styles'

type Props = {
    data: ReponseApiPlans;
}

export function Plans({ data }: Props) {
    const { title, plan, notPlan } = data;
    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.title}>R$ {plan}</Text>
                <Text style={styles.title}>R$ {notPlan}</Text>
            </View>
        </View>
    )
}