import './styles.scss'
import { useState } from 'react';
import { useAuth } from '../../context/auth';
import { Logo } from '../../components/Logo/Logo';
import toast, { Toaster } from "react-hot-toast";
import { api } from '../../services/apiService';
import InputMask from "react-input-mask";
import React from 'react';
import * as Yup from "yup";

let registerUser = Yup.object().shape({
    name: Yup.string().required("Insira o nome"),
    fone: Yup.string().required("Insira o contato"),
    username: Yup.string().required("Insira o login"),
    hashPassword: Yup.string().required("Insira a senha"),
});


export function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [fone, setFone] = useState("");
    const [user, setUser] = useState("");
    const [hashPassword, setHashPassword] = useState("");
    const [checked, setChecked] = React.useState(false);
    const [isRegister, setIsRegister] = useState(false)

    const { handlerLogin } = useAuth()

    async function handlerRegister() {
        try {
            await registerUser.validate({
                name,
                fone,
                username:user,
                hashPassword,
            });
        } catch (error) {
            toast.error(String(error).split(":")[1]);
            return;
        };

        try {
            const { data } = await api.post('/profiles ', { name, fone });
            const { id } = data;

            await api.post('/users  ', { username: user, hashPassword, profileId: id, isAdmin: checked });

            setIsRegister(false)
            toast.success('Cadastro realizado com sucesso');
        } catch {
            toast.error('Ops... Algo deu errado no seu cadastro, tente novamente mais tarde')
        }
    }

    return (
        <div className="container-sigin">
            <Toaster />
            <div className="main">
                <Logo visibility={true} />
                <div>
                    <h1>Telzir</h1>
                    <h2>Conectando com você ao mundo, somos a maior empresa telefonica do Brasil</h2>
                </div>
                {
                    isRegister === false
                        ?
                        <div className="content">
                            <label>Username *</label>
                            <input
                                type="username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label>Senha *</label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button onClick={() => handlerLogin(username, password)}>Entrar</button>
                            <p onClick={() => setIsRegister(true)}>cadastra-se</p>
                        </div>
                        :
                        <div className="content-register">
                            <label>Nome *</label>
                            <input
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label>Contato *</label>
                            <InputMask
                                type="text"
                                mask="(99) 99999-9999"
                                placeholder="(00) 00000-0000"
                                onChange={(e) => setFone(e.target.value)}
                            />
                            <label>Login *</label>
                            <input
                                type="text"
                                onChange={(e) => setUser(e.target.value)}
                            />
                            <label>Senha *</label>
                            <input
                                type="password"
                                onChange={(e) => setHashPassword(e.target.value)}
                            />
                            <div className="checkbox-admin">
                                <label>Administrador:</label>
                                <input type="checkbox"
                                    defaultChecked={checked}
                                    onChange={() => setChecked(!checked)}
                                />
                            </div>
                            <button onClick={() => handlerRegister()}>Confirmar</button>
                        </div>
                }
            </div>
        </div>
    )
}