
import { useAuction } from '../context/AuctionContext'
import { useState } from 'react'
import Modal from './Modal'

export default function TeamBoard() {
  const { teams, started, history } = useAuction()
  const [expanded, setExpanded] = useState(null)
  const [selectedImg, setSelectedImg] = useState(null)

  const TYPE_ROW_MAP = {
  "batsman": "BAT",
  "trump": "BAT", // 👈 grouped with BAT
  "bowler": "BOWL",
  "all_rounder": "AR",
  "w_keeper": "WK"
}

const ROW_ORDER = ["BAT", "BOWL", "AR", "WK"]

  if (!started) return <p>Waiting for admin...</p>
  return (
    <div className="team-board">
      <h4>Teams</h4>
      <div className="team-list">
        {teams?.map(t => (
          <div key={t.id}>
            <div className="team-item" onClick={() => setExpanded(expanded === t.id ? null : t.id)} style={{ cursor: 'pointer' }}>
              <div>{t.name}{t.owner ? ` (${t.owner})` : ''}</div>
              <div>₹{t.balance}</div>
            </div>


            {expanded === t.id && (
              <div style={{ padding: '10px', borderTop: '1px solid #ddd' }}>

                {ROW_ORDER.map(row => {
                  const rowPlayers = history
                    ?.filter(h => h.team === t.name)
                    .filter(h => TYPE_ROW_MAP[h.type] === row)

                  if (!rowPlayers?.length) return null

                  return (
                    <div key={row} style={{ marginBottom: '12px' }}>
                      <strong>{row}</strong>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '6px' }}>
                        {rowPlayers.map((h, i) => (
                          <img
                            key={`${h.player}-${i}`}
                            src={h.img}
                            style={{ width: '80px', height: 'auto', cursor: 'pointer' }}
                            alt={h.player}
                            onClick={() => setSelectedImg(h.img)}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}

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
