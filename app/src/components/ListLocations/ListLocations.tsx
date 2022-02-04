import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { api } from '../../services/api'
import { ColumnHeader } from '../ColumnHeader/ColumnHeader'
import { Locations } from '../Locations/Locations'
import { styles } from './styles'

type Locations = {
    id: number,
    origin: string,
    destiny: string,
    pricing: number,
}

export function ListLocations() {
    const [locations, setLotations] = useState<Locations[]>([])

    useEffect(() => {
        listLocations();
    },[]);

    async function listLocations() {
        const { data } = await api.get('/locations')

        setLotations(data)
    }

    const test = {
        column1: 'Origem',
        column2: 'Destino',
        column3: 'Preço',
    }

    return (
        <View style={styles.container}>
       
                <ColumnHeader data={test} />
         
            <FlatList
                data={locations}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <Locations data={item} />
                )}
            />
        </View>
    )
}
