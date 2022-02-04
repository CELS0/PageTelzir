import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { Alert, Text } from 'react-native'
import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api'
import { Buttonicon } from '../Buttonicon'
import { ListLocations } from '../ListLocations/ListLocations'
import { ListPlans, PlansRequestProps } from '../ListPlans/ListPlans'
import { Smallinput } from '../Smallinput'
import { styles } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'


export type LocationsProps = {
    id: string
    origin: string,
    destiny: string,
    pricing: string,
}

type LocationsRequest = {
    origin: string;
    destiny: string;
    pricing: number;
}

export function ConsultPlans() {
    const [origin, setOrigin] = useState('');
    const [destiny, setDestiny] = useState('');
    const [time, setTime] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [pricing, setPricing] = useState(0);
    const [pricingString, setPricingString] = useState('');

    const [locations, setLocations] = useState([]);

    const { user } = useAuth();


    async function listLocations() {
        const { data } = await api.get('/locations');
        setLocations(data)
    }

    React.useEffect(() => {
        listLocations();
    }, [])

    async function handlerRegisterLocation() {
        setPricing(Number(pricingString))
        try {

            const requestBody: LocationsRequest = {
                origin,
                destiny,
                pricing,
            }

            const token = await AsyncStorage.getItem("@telzir:jwt_access_token");

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };


            // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            await api.post('/locations', requestBody,{headers:{'Content-Type': 'application/json', Authorization: `Bearer ${token}`}} );

            await listLocations();

        } catch {
            Alert.alert('Ops... Algo deu errado, tente novamente')
        }
    }


    return (
        <>
            {
                isVisible
                    ?
                    <ListLocations data={locations} />
                    :
                    <ListPlans data={{ origin, destiny, time }} />
            }

            <LinearGradient
                style={styles.container}
                colors={['#202c3c', '#0b121d']}
            >
                {
                    user?.isAdmin
                        ?
                        <>
                            <Text style={styles.label} >Origem*</Text>
                            <Smallinput
                                onChangeText={setOrigin}
                            />

                            <Text style={styles.label} >Destino*</Text>
                            <Smallinput
                                onChangeText={setDestiny}
                            />

                            <Text style={styles.label} >Preço por minutos*</Text>
                            <Smallinput
                                onChangeText={setPricingString}
                            />

                            <Buttonicon
                                title={isVisible ? 'Cadastar' : 'Tabela de preços'}
                                onPress={() => handlerRegisterLocation()}
                            />
                        </>
                        :
                        <>
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
                                title={isVisible ? 'Calcular custos' : 'Tabela de preços'}
                                onPress={() => setIsVisible(!isVisible)}
                            />
                        </>
                }


            </LinearGradient>
        </>
    )
}