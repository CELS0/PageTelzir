import logoImg from '../../assets/globo1.svg'
import './styles.scss'

interface LogoProps {
    visibility: boolean;
}

export function Logo({ visibility }: LogoProps){
    return(
        <img className={`logo-earth ${visibility ? '' : 'logo-earth-hidden'}`} src={logoImg}/>
    )
}