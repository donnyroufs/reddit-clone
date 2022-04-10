import styles from "./App.module.scss"

import { Header } from "./Components/Header/Header"
import { Routes, Route } from "react-router-dom"
import { Home } from "./Pages/Home"

function App() {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
