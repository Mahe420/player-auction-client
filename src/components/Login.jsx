
import { useAuction } from '../context/AuctionContext'
import { useState } from 'react'
import Modal from './Modal'

export default function Login(){
  const { isAdmin, setIsAdmin, socket } = useAuction()
  const [open, setOpen] = useState(false)
  const [pwd, setPwd] = useState('')
  const [resetOpen, setResetOpen] = useState(false)

  const submit = ()=>{
    if(pwd === 'admin123'){
      setIsAdmin(true)
      setOpen(false)
      setPwd('')
    } else alert('Incorrect password')
  }

  const confirmReset = ()=>{
    socket.emit('reset')
    setResetOpen(false)
  }

  return (
    <div className="login">
      <button onClick={()=>{
        if(isAdmin) setIsAdmin(false)
        else setOpen(true)
      }}>{isAdmin?'Logout':'Admin Login'}</button>
      <button onClick={() => setResetOpen(true)} disabled={!isAdmin} style={{ marginLeft: 8 }}>Reset</button>

      <Modal visible={open} title="Admin Login" onClose={()=>setOpen(false)}>
        <div>
          <input autoFocus placeholder="Password" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} />
        </div>
        <div style={{textAlign:'right', marginTop:8}}>
          <button onClick={submit}>Login</button>
        </div>
      </Modal>

      <Modal visible={resetOpen} title="Confirm Reset" onClose={()=>setResetOpen(false)}>
        <div>Reset all auction data and start fresh?</div>
        <div style={{ textAlign: 'right', marginTop: 10 }}>
          <button onClick={confirmReset}>Yes</button>
        </div>
      </Modal>
    </div>
  )
}
