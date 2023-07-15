import { Trash } from 'phosphor-react';
import style from './Todo.module.css'
import { useState } from 'react';

interface TodoProps {
    id: string;
    content: string;
    isCompleted: boolean;
    onDeleteTask: (id: string) => void;
    onConcluiTask: (check: boolean, id: string) => void;
}

export function Todo({id, content, isCompleted, onDeleteTask, onConcluiTask}: TodoProps) {

    const [checked, setChecked] = useState(isCompleted)

    function handleDeleteTask(){
        onDeleteTask(id);
    }

    function handleChecked(){
        const check = !checked;
        setChecked(check)
        onConcluiTask(check, id);
    }

    return (
        <div className={style.todoBox}>
            <label className={style.containerCheck}>
                <input 
                    type="checkbox" 
                    checked={checked}
                    onChange={handleChecked}
                /> <span className={style.checkmark}></span>
            </label>
            <p className={checked ? style.titleChecked : style.titleNormal}>{content}</p>
            <button onClick={handleDeleteTask} title='Deletar tarefa'>
                <Trash size={24} />
            </button>
        </div>
    )
}