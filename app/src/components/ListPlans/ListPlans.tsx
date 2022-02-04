import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { api } from '../../services/api';
import { Plans } from '../Plans/Plans';
import { styles } from './styles'

export type PlansRequestProps = {
    origin: string,
    destiny: string,
    time: string,
};

type Props = {
    data: PlansRequestProps;
}


export type ReponseApiPlans = {
    id: number,
    title: string;
    plan: number;
    notPlan: number;
}

export function ListPlans({ data }: Props) {

    const { origin, destiny, time } = data;

    const [plans, setPlans] = useState<ReponseApiPlans[]>([]);

    useEffect(() => {
        listPlans();
    }, []);

    async function listPlans() {
        const { data } = await api.get<ReponseApiPlans[]>(`/plans/${origin}/${destiny}/${time}`)

        setPlans(data)
    }

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <View style={styles.content}>
                    <Text style={styles.title}>Plano FaleMais</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Com FaleMais</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Sem FaleMais</Text>
                </View>

            </View>
            <FlatList
                keyExtractor={item => String(item.id)}
                data={plans}
                renderItem={({ item }) => (
                    <Plans data={item} />
                )}
            />
        </View>
    )
}