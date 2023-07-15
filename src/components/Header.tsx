import style from './Header.module.css'

import todoLogo from '../assets/rocket.svg'

export function Header(){
    return (
        <header className={style.header}>
            <img src={todoLogo} alt="todoLogo" />
            <p className={style.to}>to</p>
            <p className={style.do}>do</p>
        </header>
    )
}