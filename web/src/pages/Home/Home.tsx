import React, { useState } from 'react'
import { Logo } from '../../components/Logo/Logo'
import { api } from '../../services/apiService'
import toast, { Toaster } from "react-hot-toast";
import InputMask from "react-input-mask";
import { BiRightArrowAlt, BiUndo,BiXCircle } from "react-icons/bi";
import * as Yup from "yup";



import './styles.scss'
import { useAuth } from '../../context/auth';

type IItemTable = {
    origin: string;
    destiny: string;
    pricing: number;
    title: string;
    plan: number;
    notPlan: number;
    description: string
    timeExtend: number,
}

type ICreateLocation = {
    origin: string;
    destiny: string;
    pricing: number;
}

type ICreatePlan = {
    title: string;
    description: string;
    timeExtend: number;
}

let registerLocation = Yup.object().shape({
    origin: Yup.string().length(3, "Insira a origem").required(),
    destiny: Yup.string().length(3, "Insira o destino").required(),
    pricing: Yup.number().required("Insira preço por minutos")
});

let registerPlan = Yup.object().shape({
    title: Yup.string().required("Insira o título"),
    descriptionNew: Yup.string().required("Insira a descrição"),
    timeExtend: Yup.number().required("Insira tempo sem custo na chamada")
});

export function Home() {
    const [locations, setLocations] = useState([])
    const [plans, setPlans] = useState([])

    const [isvisible, setIsvisible] = useState(false)

    const [origin, setOrigin] = useState('')
    const [destiny, setDestiny] = useState('')
    const [time, setTime] = useState(0)
    const [pricing, setPricing] = useState(0)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [timeExtend, setTimeExtend] = useState(0)

    const { user } = useAuth()


    React.useEffect(() => {
        listLocations();
        async function listLocations() {
            const { data: dataLocation } = await api.get('/locations');
            setLocations(dataLocation)

            const { data: dataPlans } = await api.get('/plans');
            setPlans(dataPlans)
        }

    }, [])

    async function listPlans() {
        try {
            const { data } = await api.get(`/plans/${origin}/${destiny}/${time}`);
            setPlans(data)

            setIsvisible(true)

            toast.success('Deu tudo certo')
        } catch {
            if(locations.length === 0){
                toast.error('Ops... Infelizmente ainda não temos linhas cadastradas')
            }else{
                toast.error('Ops... Algo deu errado, verifique se os dados então corretos')
            }
        }
    }

    async function handlerRegisterLocation() {
        try {
            await registerLocation.validate({
                destiny,
                origin,
                pricing,
            });
        } catch (error) {
            toast.error(String(error).split(":")[1]);
            return;
        }

        try {

            const requestBody: ICreateLocation = {
                destiny,
                origin,
                pricing,
            }

            const token = sessionStorage.getItem('@telzir:jwt_access_token')

            await api.post('/locations', requestBody, {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });

            const { data } = await api.get('/locations');
            setLocations(data)

            toast.success('Deu tudo certo')
        } catch {
            toast.error('Ops... Algo deu errado, tente novamente')
        }
    }

    async function handlerRegisterPlans() {
        try {
            await registerPlan.validate({
                title,
                descriptionNew: description,
                timeExtend,
            });
        } catch (error) {
            toast.error(String(error).split(":")[1]);
            return;
        }

        try {

            const requestBody: ICreatePlan = {
                title,
                description,
                timeExtend,
            }

            const token = sessionStorage.getItem('@telzir:jwt_access_token')

            await api.post('/plans', requestBody, {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });

            const { data } = await api.get('/plans');
            setPlans(data)

            toast.success('Deu tudo certo')
        } catch {
            toast.error('Ops... Algo deu errado, tente novamente')
        }
    }

    function forceLogout() {
        sessionStorage.clear();
        window.location.pathname = '';
      }


    return (
        <div className="container-home">
            <Toaster />
                <span className="close-home" onClick={() =>forceLogout()}> <BiXCircle/></span>
    
            <header>
                <h1>Telzir</h1>
                <h2>Olá, {user?.name}. Seja bem-vindo a Telzir</h2>
                <h2>Estamos sempre preocupados com sua transparência</h2>
            </header>
            <div className="main-home">
                <Logo visibility={false} />
                {
                    isvisible === false ?
                        <div className="tables">
                            <h2>Tabela de Preço por minutos</h2>
                            <main>
                                <table>
                                    <tr className="content-text">
                                        <th>Origem</th>
                                        <th>Destino</th>
                                        <th>Preço/mim</th>
                                    </tr>
                                    {
                                        locations.map((item: IItemTable) => (
                                            <tr className="content-text" >
                                                <td>{item.origin}</td>
                                                <td>{item.destiny}</td>
                                                <td>R$ {item.pricing}</td>
                                            </tr>
                                        ))
                                    }
                                </table>
                            </main>
                        </div>
                        :
                        <div className="tables">
                            <h2>Custos por planos FaleMais</h2>

                            {
                                user?.isAdmin === false
                                    ?
                                    <main>
                                        <table>
                                            <tr className="content-text">
                                                <th>Plano FaleMais</th>
                                                <th>Com FaleMais</th>
                                                <th>Sem FaleMais</th>
                                            </tr>
                                            {
                                                plans.map((item: IItemTable) => (
                                                    <tr className="content-text" >
                                                        <td>{item.title}</td>
                                                        <td>R$ {item.plan}</td>
                                                        <td>R$ {item.notPlan}</td>
                                                    </tr>
                                                ))
                                            }
                                        </table>
                                    </main>
                                    :
                                    <main>
                                        <table>
                                            <tr className="content-text">
                                                <th>Plano FaleMais</th>
                                                <th>Descrição</th>
                                                <th>Tempo sem custo </th>
                                            </tr>
                                            {
                                                plans.map((item: IItemTable) => (
                                                    <tr className="content-text" >
                                                        <td>{item.title}</td>
                                                        <td>{item.description}</td>
                                                        <td>{item.timeExtend}</td>
                                                    </tr>
                                                ))
                                            }
                                        </table>
                                    </main>
                            }
                        </div>
                }

                {
                    user?.isAdmin === false
                        ?
                        <div className="content-home">
                            <label>Origem *</label>
                            <InputMask
                                type="text"
                                mask="999"
                                placeholder="000"
                                onChange={(e) => setOrigin(e.target.value)}
                            />
                            <label>Destino *</label>
                            <InputMask
                                type="text"
                                mask="999"
                                placeholder="000"
                                onChange={(e) => setDestiny(e.target.value)}
                            />
                            <label>Tempo da ligação *</label>
                            <input
                                type="number"
                                onChange={(e) => setTime(Number(e.target.value))}
                            />

                            {isvisible === true ? <button onClick={() => setIsvisible(false)}>Tabela de preços</button> : <button onClick={() => listPlans()}>Calcular custo</button>}
                        </div>
                        :
                        isvisible
                            ?
                            <div className="content-home">
                                <label>Título *</label>
                                <input
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <label>Descrição *</label>
                                <input
                                    type="text"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <label>Tempo sem custo *</label>
                                <input
                                    type="number"
                                    onChange={(e) => setTimeExtend(Number(e.target.value))}
                                />

                                <button onClick={() => handlerRegisterPlans()}>Cadastrar</button>
                                <p onClick={() => setIsvisible(false)}><BiUndo /> Anterior</p>
                            </div>
                            :
                            <div className="content-home">
                                <label>Origem *</label>
                                <InputMask
                                    type="text"
                                    mask="999"
                                    placeholder="000"
                                    onChange={(e) => setOrigin(e.target.value)}
                                />
                                <label>Destino *</label>
                                <InputMask
                                    type="text"
                                    mask="999"
                                    placeholder="000"
                                    onChange={(e) => setDestiny(e.target.value)}
                                />
                                <label>Preço por minutos *</label>
                                <input
                                    type="number"
                                    onChange={(e) => setPricing(Number(e.target.value))}
                                />
                                <button onClick={() => handlerRegisterLocation()}>Cadastrar</button>
                                <p onClick={() => setIsvisible(true)}>Planos <BiRightArrowAlt /></p>
                            </div>
                }
            </div>

        </div>
    )

}