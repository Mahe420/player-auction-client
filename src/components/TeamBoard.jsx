
import { useAuction } from '../context/AuctionContext'
import { useState } from 'react'
import Modal from './Modal'

export default function TeamBoard(){
  const { teams, started, history } = useAuction()
  const [expanded, setExpanded] = useState(null)
  const [selectedImg, setSelectedImg] = useState(null)

  if(!started) return <p>Waiting for admin...</p>
  return (
    <div className="team-board">
      <h4>Teams</h4>
      <div className="team-list">
        {teams?.map(t => (
          <div key={t.id}>
            <div className="team-item" onClick={() => setExpanded(expanded === t.id ? null : t.id)} style={{ cursor: 'pointer' }}>
              <div>{t.name}{t.owner?` (${t.owner})`:''}</div>
              <div>₹{t.balance}</div>
            </div>
            {expanded === t.id && (
              <div style={{ padding: '10px', borderTop: '1px solid #ddd' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {history?.filter(h => h.team === t.name).map((h, i) => (
                    <img key={i} src={h.img} style={{ width: '80px', height: 'auto', cursor: 'pointer' }} alt={h.player} onClick={() => setSelectedImg(h.img)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal visible={!!selectedImg} onClose={() => setSelectedImg(null)}>
        <img src={selectedImg} style={{ width: '100%', height: 'auto' }} alt="Player" />
      </Modal>
    </div>
  )
}
