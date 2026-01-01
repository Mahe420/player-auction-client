
import { useAuction } from '../context/AuctionContext'
import { useState } from 'react'
import Modal from './Modal'

export default function TeamBoard() {
  const { socket,teams, started, history } = useAuction()
  const [expanded, setExpanded] = useState(null)
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  const TYPE_ROW_MAP = {
    "batsman": "BAT",
    "trump": "BAT", // 👈 grouped with BAT
    "bowler": "BOWL",
    "all_rounder": "AR",
    "w_keeper": "WK"
  }
  const trump_cards=['Player 45','Player 46','Player 47','Player 7']
  const ROW_ORDER = ["BAT", "WK", "AR", , "BOWL"]
  const handleTypeUpdate = (selectedPlayer) => {
    socket.emit('updateTrump',{...selectedPlayer})
    setSelectedPlayer(null);
  }

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
                            onClick={() => setSelectedPlayer(h)}
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

      <Modal visible={!!selectedPlayer} onClose={() => setSelectedPlayer(null)}>
        {selectedPlayer && (
          <div>
            <img
              src={selectedPlayer.img}
              style={{ width: '100%', height: 'auto' }}
              alt={selectedPlayer.player}
            />

            <h4 style={{ marginTop: '10px' }}>{selectedPlayer.player}</h4>

            {/* 👇 Only for TRUMP */}
            {trump_cards.includes(selectedPlayer.player) && (
              <div style={{ marginTop: '10px' }}>
                <label>Change Player Type:</label>

                <select
                  value={selectedPlayer.newType || ""}
                  onChange={(e) =>
                    setSelectedPlayer({
                      ...selectedPlayer,
                      newType: e.target.value
                    })
                  }
                >
                  <option value="">Select</option>
                  <option value="batsman">Batsman</option>
                  <option value="bowler">Bowler</option>
                  <option value="all_rounder">All Rounder</option>
                  <option value="w_keeper">Wicket Keeper</option>
                </select>

                <button
                  style={{ marginLeft: '10px' }}
                  onClick={() => handleTypeUpdate(selectedPlayer)}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>

    </div>
  )
}
