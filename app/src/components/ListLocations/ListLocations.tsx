import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { api } from '../../services/api'
import { ColumnHeader } from '../ColumnHeader/ColumnHeader'
import { LocationsProps } from '../ConsultPlans/ConsultPlans'
import { Locations } from '../Locations/Locations'
import { styles } from './styles'

type Props = {
    data:LocationsProps[];
}

export function ListLocations({data}:Props) {

    const test = {
        column1: 'Origem',
        column2: 'Destino',
        column3: 'Preço',
    }

    return (
        <View style={styles.container}>
       
                <ColumnHeader data={test} />
         
            <FlatList
                data={data}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <Locations data={item} />
                )}
            />
        </View>
    )
}
