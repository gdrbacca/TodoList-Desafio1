import { Header } from './components/Header'
import './global.css'
import { TodoList } from './components/TodoList'
import style from './App.module.css'


export function App() {

  return (
    <div>
      <Header />
      <main className={style.main}>
        <TodoList />
      </main>
    </div>
  )
}
