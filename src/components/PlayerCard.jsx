
import { useAuction } from '../context/AuctionContext'
import { useState } from 'react'
import Modal from './Modal'

export default function PlayerCard(){
  const { socket, currentPlayer, isAdmin, started, teams, playerHistory } = useAuction()
  const [sellOpen, setSellOpen] = useState(false)
  const [unsoldOpen, setUnsoldOpen] = useState(false)
  const [selTeam, setSelTeam] = useState(teams?.[0]?.id || '')
  const [amount, setAmount] = useState('')
  const [historyOpen, setHistoryOpen] = useState(false)

  if(!started) return null

  const pick = () => socket.emit('pickPlayer')

  const openSell = ()=>{
    setSelTeam(teams?.[0]?.id || '')
    setAmount('')
    setSellOpen(true)
  }

  const submitSell = ()=>{
    const t = Number(selTeam)
    const a = Number(amount)
    if(!t || !a || a<=0) return
    socket.emit('sell',{teamId:t, amount:a})
    setSellOpen(false)
  }

  const openUnsell = ()=> setUnsoldOpen(true)
  const confirmUnsell = ()=>{ socket.emit('unsell'); setUnsoldOpen(false) }

  const openHistory = ()=> setHistoryOpen(true)

  if(!currentPlayer)
    return isAdmin ? <button onClick={pick}>Pick Player</button> : <p>Waiting for next player...</p>

  return (
    <div className="player-card">
      <img src={currentPlayer.img} className="player-image" alt={currentPlayer.name} onClick={openHistory} style={{cursor:'pointer'}}/>
      <h2>{currentPlayer.name}</h2>
      <div style={{marginTop:8}}>
        {isAdmin && <button onClick={openSell} style={{marginRight:8}}>Sold</button>}
        {isAdmin && <button onClick={openUnsell}>Unsold</button>}
      </div>

      <Modal visible={sellOpen} title="Sell Player" onClose={()=>setSellOpen(false)}>
        <div>
          <label>Team</label>
          <select value={selTeam} onChange={e=>setSelTeam(e.target.value)}>
            <option value="">Please select team</option>
            {teams?.map(t=> <option key={t.id} value={t.id}>{t.name} ({t.owner})</option>)}
          </select>
        </div>
        <div style={{marginTop:8}}>
          <label>Amount (₹)</label>
          <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} />
        </div>
        <div style={{textAlign:'right', marginTop:10}}>
          <button onClick={submitSell}>Confirm</button>
        </div>
      </Modal>

      <Modal visible={unsoldOpen} title="Confirm Unsold" onClose={()=>setUnsoldOpen(false)}>
        <div>Return player to unsold pool?</div>
        <div style={{textAlign:'right', marginTop:10}}>
          <button onClick={confirmUnsell}>Yes</button>
        </div>
      </Modal>

      <Modal visible={historyOpen} title={`History: ${currentPlayer.name}`} onClose={()=>setHistoryOpen(false)}>
        <div style={{textAlign:'center'}}>
          <img src={currentPlayer.img} style={{width:'100px', height:'auto', marginBottom:'10px'}} alt={currentPlayer.name}/>
          <div>
            {(playerHistory[currentPlayer.id] || []).length ? (playerHistory[currentPlayer.id] || []).map((h,i)=>(
              <div key={i} style={{marginBottom:'5px'}}>
                {h.action === 'sold' ? `Sold to ${h.team} for ₹${h.amount}` : 'Unsold'}
              </div>
            )) : <div>No history</div>}
          </div>
        </div>
      </Modal>
    </div>
  )
}
