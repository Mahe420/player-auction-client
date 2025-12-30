
import { useAuction } from '../context/AuctionContext'
import { useState } from 'react'
import Modal from './Modal'

export default function SoldHistory(){
  const { history } = useAuction()
  const [selectedImg, setSelectedImg] = useState(null)

  return (
    <div className="history">
      <h4>Sold History</h4>
      {history?.length ? history.map((h,i)=>(
        <div key={i} style={{display:'flex', alignItems:'center', marginBottom:'5px'}}>
          <img src={h.img} style={{width:'50px', height:'auto', marginRight:'10px', cursor:'pointer'}} alt={h.player} onClick={()=>setSelectedImg(h.img)} />
          <div>{h.player} → {h.team} ₹{h.amount}</div>
        </div>
      )) : <div>No sales yet</div>}

      <Modal visible={!!selectedImg} onClose={()=>setSelectedImg(null)}>
        <img src={selectedImg} style={{width:'100%', height:'auto'}} alt="Player" />
      </Modal>
    </div>
  )
}
