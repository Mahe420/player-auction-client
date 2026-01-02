
import { AuctionProvider } from './context/AuctionContext'
import Login from './components/Login'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Pending from './components/Pending'

export default function App() {
  return (

    <AuctionProvider>
      <div className="app">
        <Login />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pending" element={<Pending />} />
        </Routes>
      </div>
    </AuctionProvider>
  )
}
