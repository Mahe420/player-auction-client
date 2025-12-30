
import { useAuction } from '../context/AuctionContext'
import { useState } from 'react'
import Modal from './Modal'

export default function TeamSetup() {
  const { socket, started, isAdmin } = useAuction()
  if (!isAdmin || started) return null

  const [teams, setTeams] = useState(
    [1, 2, 3, 4].map(i => ({ id: i, name: '', owner: '', balance: 2000 }))
  )
  const [error, setError] = useState('')
  const [resetOpen, setResetOpen] = useState(false)

  const update = (idx, key, val) => {
    const copy = teams.slice();
    copy[idx] = { ...copy[idx], [key]: key === 'balance' ? Number(val) : val }
    setTeams(copy)
    // Clear error if all teams are now filled
    if (copy.every(t => t.name.trim() && t.balance > 0)) setError('')
  }

  const start = () => {
    const payload = teams.filter(t => t.name.trim() && t.balance > 0)
    if (payload.length === 0) { setError('Enter at least one team with name and positive balance'); return }
    setError('')
    socket.emit('start', payload)
  }

  const confirmReset = () => {
    socket.emit('reset')
    setResetOpen(false)
  }

  return (
    <div className="team-setup">
      <h3>Setup Teams (max 4)</h3>
      {teams.map((t, i) => (
        <div className="team-row" key={t.id}>
          <input placeholder="Team name" value={t.name} onChange={e => update(i, 'name', e.target.value)} />
          <input placeholder="Owner" value={t.owner} onChange={e => update(i, 'owner', e.target.value)} />
          <input placeholder="Balance (₹)" type="number" value={t.balance} onChange={e => update(i, 'balance', e.target.value)} />
        </div>
      ))}
      {error && <div style={{ color: 'crimson', marginTop: 8 }}>{error}</div>}
      {teams.every(t => t.name.trim() && t.balance > 0) && (
        <div>
          <button onClick={start}>Start Auction</button>
          <button onClick={() => setResetOpen(true)} style={{ marginLeft: 8 }}>Reset</button>
        </div>
      )}

      <Modal visible={resetOpen} title="Confirm Reset" onClose={() => setResetOpen(false)}>
        <div>Reset all auction data and start fresh?</div>
        <div style={{ textAlign: 'right', marginTop: 10 }}>
          <button onClick={confirmReset}>Yes</button>
        </div>
      </Modal>

    </div>
  )
}
