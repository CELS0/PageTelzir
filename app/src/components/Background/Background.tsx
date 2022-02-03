import React, { ReactNode } from 'react';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
    children: ReactNode;
}

export function Background({ children }: Props) {
    return (
        <LinearGradient
            style={styles.container}
            colors={[ '#202c3c','#0b121d']}
        >
            {children}
        </LinearGradient>
    )
}