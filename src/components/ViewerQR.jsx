
import QRCode from 'qrcode.react'
export default function ViewerQR(){
  return <QRCode value={window.location.origin} size={120}/>
}
