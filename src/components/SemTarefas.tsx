import style from './SemTarefas.module.css'
import { Clipboard } from 'phosphor-react'

export function SemTarefas() {
    return (
        <div className={style.corpo}>
            <Clipboard className={style.clipboard } size={40}/>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
    )
}