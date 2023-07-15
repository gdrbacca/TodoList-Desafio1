import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import style from './TodoList.module.css'
import { PlusCircle } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid'
import { SemTarefas } from './SemTarefas';
import { Todo } from './Todo';

interface TodoObject {
    id: string;
    title: string;
    isCompleted: boolean;
}

export function TodoList(){

    const [newTodo, setNewTodo] = useState<TodoObject[]>([])
    const [newTodoText, setNewTodoText] = useState('')
    const [todoConcluidas, setTodoConcluidas] = useState(0)



    function handleNewTodoChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewTodoText(event.target.value)
    }

    function handleNewTodoInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Digite algo válido cara!')
    }

    function handleCreateNewTodo(event: FormEvent){
        event.preventDefault()

        const Todo = {} as TodoObject;

        Todo.id = uuidv4();
        Todo.title = newTodoText;
        Todo.isCompleted = false;
        setNewTodo((prevTodos) => {
            return [...prevTodos, Todo]
        })
        setNewTodoText('')
    }

    function deleteTask(idDelete: string){
        const todoIsCompleted = newTodo.filter(todo => {
            if(todo.id === idDelete)
                return todo
        })

        if(todoIsCompleted.length > 0 && todoIsCompleted[0].isCompleted) {
            setTodoConcluidas((concluidas) => {
                return concluidas - 1
            })
        }

        const todoWithoutDeleted = newTodo.filter(todo => {
            if(todo.id != idDelete)
                return todo 
        })
        setNewTodo(todoWithoutDeleted)

        //console.log('deletar')
    }

    function concluiTask(check: boolean, id: string){
        const todoConcluida = newTodo.map(todo => {
            if(todo.id === id){
                todo.isCompleted = check
            }
            return todo
        })
        setNewTodo(todoConcluida)
        
        if(check){
            setTodoConcluidas((concluidas) => {
                return concluidas + 1
            })
        } else {
            setTodoConcluidas((concluidas) => {
                return concluidas - 1
            })
        }
    }

    return (
        <div>
            <form onSubmit={handleCreateNewTodo} className={style.createForm}>
                <textarea 
                    name="createTodo" 
                    placeholder='Adicione uma nova tarefa'
                    value={newTodoText}
                    onChange={handleNewTodoChange}
                    onInvalid={handleNewTodoInvalid}
                    required />
                <button>
                    Criar
                    <PlusCircle />
                </button>
            </form>

            <div className={style.contadores}>
                <div className={style.contador1}>
                    <label htmlFor="campoCriadas">Tarefas criadas   </label>
                    <input 
                        type="text" 
                        name="campoCriadas" 
                        className={style.inputMenor} 
                        value={newTodo.length} 
                        disabled
                    />
                </div>
                <div className={style.contador2}>
                    <label htmlFor="campoConcluidas">Concluidas   </label>
                    <input 
                        type="text" 
                        name="campoConcluidas" 
                        className={newTodo.length > 0 ? style.inputMaior : style.inputMenor} 
                        value={newTodo.length > 0 ? `${todoConcluidas} de ${newTodo.length}` : 0} 
                        disabled
                    />
                </div>
            </div>
            <div className={style.todolist}>
                {newTodo.length === 0 ? <SemTarefas /> :
                    newTodo.map(todo => {
                        return (
                            <Todo 
                                key={todo.id} 
                                id={todo.id}
                                content={todo.title} 
                                isCompleted={todo.isCompleted}
                                onDeleteTask={deleteTask}
                                onConcluiTask={concluiTask} />
                        )
                    })         
                }
            </div>
        </div>
    )
}