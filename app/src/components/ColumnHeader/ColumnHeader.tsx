import React from 'react'
import { Text, View } from 'react-native'

import { styles } from './styles'

type IColumns = {
    column1: string;
    column2: string;
    column3: string;
}

type Props = {
    data: IColumns;
}

export function ColumnHeader({ data }: Props) {

    const { column1, column2, column3 } = data;
    return (
        <View style={styles.column}>
            <Text style={styles.label} >{column1}*</Text >
            <Text style={styles.label} >{column2}*</Text>
            <Text style={styles.label} >{column3}*</Text>
        </View>
    )
}