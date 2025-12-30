
import { AuctionProvider } from './context/AuctionContext'
import Login from './components/Login'
import TeamSetup from './components/TeamSetup'
import TeamBoard from './components/TeamBoard'
import PlayerCard from './components/PlayerCard'
import SoldHistory from './components/SoldHistory'
import ViewerQR from './components/ViewerQR'

export default function App() {
  return (
    <AuctionProvider>
      <div className="app">
        <Login />
        {/* <ViewerQR /> */}
        <div className="layout">
          <div className="left">
            <PlayerCard />
            <SoldHistory />
          </div>
          <div className="right">
            <TeamSetup />
            <TeamBoard />
          </div>
        </div>
      </div>
    </AuctionProvider>
  )
}
