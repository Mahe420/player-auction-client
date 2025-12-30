import React from 'react'

export default function Modal({ visible, title, children, onClose }){
  if(!visible) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        {title && <h3>{title}</h3>}
        <div className="modal-body">{children}</div>
        <div style={{textAlign:'right'}}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
