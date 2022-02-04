import React, { useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Checkbox } from 'react-native-paper';
import { styles } from './styles'
import Logo from '../../../assets/globo2.svg'
import { Buttonicon } from '../../components/Buttonicon'
import { Smallinput } from '../../components/Smallinput'
import { Background } from '../../components/Background/Background'
import { useAuth } from '../../hooks/auth'
import { RectButton } from 'react-native-gesture-handler'
import { api } from '../../services/api'


export function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [name, setName] = useState("");
    const [fone, setFone] = useState("");
    const [user, setUser] = useState("");
    const [hashPassword, setHashPassword] = useState("");

    const [isRegister, setIsRegister] = useState(false);

    const { signIn, loading } = useAuth();

    async function handleSignIn() {
        try {
            await signIn(username, password);
        } catch (err) {
            console.error(err)
        }
    }

    async function handlerRegister() {
        setIsRegister(false)
        try {
            const { data } = await api.post('/profiles ', { name, fone });
            const { id } = data;

            await api.post('/users', { username: user, hashPassword, profileId: id, isAdmin: false });


        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Background>

            <View style={styles.container}>
                {isRegister ?
                    <>
                        <Text style={styles.label} >Nome*</Text>
                        <Smallinput
                            onChangeText={setName}
                        />
                        <Text style={styles.label} >Contato*</Text>
                        <Smallinput
                            onChangeText={setFone}
                        />
                        <Text style={styles.label} >Login*</Text>
                        <Smallinput
                            onChangeText={setUser}
                        />
                        <Text style={styles.label} >Senha*</Text>
                        <Smallinput
                            secureTextEntry={true}
                            onChangeText={setHashPassword}
                        />
                        {
                            loading ? <ActivityIndicator color="#ffff" /> :
                                <Buttonicon
                                    title="Confirmar"
                                    onPress={handlerRegister}
                                />
                        }
                    </>
                    :
                    <>
                        <Text style={styles.title}>Telzir</Text>
                        <Logo />
                        <Text style={styles.label} >Username*</Text>
                        <Smallinput
                            onChangeText={setUsername}
                        />
                        <Text style={styles.label} >Senha*</Text>
                        <Smallinput
                            secureTextEntry={true}
                            onChangeText={setPassword}
                        />
                        {
                            loading ? <ActivityIndicator color="#ffff" /> :
                                <Buttonicon
                                    title="Entrar"
                                    onPress={handleSignIn}
                                />
                        }
                    </>
                }
                {isRegister ?
                    <RectButton style={styles.content} onPress={() => setIsRegister(!isRegister)}>
                        <Text style={styles.register}>Voltar</Text>
                    </RectButton>
                    :
                    <RectButton style={styles.content} onPress={() => setIsRegister(!isRegister)}>
                        <Text style={styles.register}>Cadastra-se</Text>
                    </RectButton>
                }
            </View>
        </Background >
    )
}