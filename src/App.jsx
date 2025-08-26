import './App.css'
import { Counter } from './Counter.jsx'

function App() {
  return (
    <>
      <h1>7 react GUIs</h1>
      <p></p>
      <div className="card">
        <p>
          First one's a counter, and fuck me if the vite/react template I started this with
          doesn't implement one as a working example.
        </p>
        <Counter />
      </div>
    </>
  )
}

export default App
